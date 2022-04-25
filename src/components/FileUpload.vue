<template>
    <input ref="fileInput" v-on:change="onFileChange" type="file" multiple accept="image/*" :disabled="loading"
        hidden />
    <v-btn @click="$refs.fileInput.click()" prepend-icon="mdi-camera" class="mb-4">Escolher imagens</v-btn>
    <v-card class="my-2">
        <v-list>
            <v-list-subheader>
                {{ files.length }} image{{ files.length > 1 || files.length == 0 ? "ns" : "m" }}
            </v-list-subheader>
            <v-list-item v-for="file in files" :key="file.name" :title="file.name">
                <template v-slot:prepend>
                    <v-list-item-avatar start>
                        <img :src="createImgSrc(file)" width="64" height="64" @load="resizeImage" />
                    </v-list-item-avatar>
                </template>
                <template v-slot:append>
                    <v-list-item-action end>
                        <v-btn icon="mdi-delete" density="comfortable" @click="removeFile(file.name)"></v-btn>
                    </v-list-item-action>
                </template>
            </v-list-item>
        </v-list>
    </v-card>
    <div class="status-message" v-if="isSuccess || isError">
        <span class="success" v-if="isSuccess">Imagens enviadas!</span>
        <span class="error" v-if="isError">Parece que algo deu errado...</span>
    </div>
    <v-btn @click="send" :disabled="loading || files.length <= 0" append-icon="mdi-send" class="mt-4">
        {{ sendButtonText }}
    </v-btn>
</template>
<script lang="ts">
import resizeImageFile from '@/utils/image-resize';
import { uploadFiles } from '@/utils/gcs';
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            files: new Array<File>(),
            loading: false,
            isSuccess: false,
            isError: false,
        }
    },
    computed: {
        sendButtonText(): string {
            return this.loading ? "Enviando" : "Enviar";
        }
    },
    methods: {
        onFileChange(event: Event) {
            const input = event.target as HTMLInputElement;
            if (!input?.files?.item(0)) return;
            for (let file of input.files) {
                this.files.push(file);
            }
        },
        createImgSrc(file: File): string {
            return URL.createObjectURL(file);
        },
        resizeImage(e: Event): string {
            const img = e.target as HTMLImageElement;
            return resizeImageFile(img);
        },
        removeFile(filename: string) {
            const index = this.files.findIndex(x => x.name == filename);
            if (index < 0) return;
            this.files.splice(index, 1);
        },
        async send() {
            this.loading = true;

            try {
                await uploadFiles(this.files);
                this.files.splice(0, this.files.length);
                this.setSuccess();
            } catch (error) {
                console.error(error);
                this.setError();
            }

            this.loading = false;
        },
        setSuccess() {
            this.isSuccess = true;
            setTimeout(() => this.isSuccess = false, 5000);
        },
        setError() {
            this.isError = true;
            setTimeout(() => this.isError = false, 10000);
        }
    }
})
</script>