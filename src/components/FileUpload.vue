<template>
    <v-container>
        <input
            ref="fileInput"
            v-on:change="onFileChange"
            type="file"
            multiple
            accept="image/*"
            :disabled="loading"
            hidden
        />
        <v-btn @click="$refs.fileInput.click()" class="primary">
            <v-icon left>mdi-camera</v-icon>
            Escolher imagens</v-btn
        >

        <v-list flat>
            <v-subheader>
                {{ files.length }} image{{
                    files.length > 1 || files.length == 0 ? "ns" : "m"
                }}
            </v-subheader>
            <v-list-item v-for="file in files" :key="file.name">
                <v-list-item-avatar>
                    <img
                        :src="createImgSrc(file)"
                        alt="Miniatura da foto"
                        width="64"
                        height="64"
                        @load="resizeImage"
                    />
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-text="file.name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn icon @click="removeFile(file.name)" color="primary">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
        <div class="status-message" v-if="isSuccess || isError">
            <span class="success" v-if="isSuccess">Imagens enviadas!</span>
            <span class="error" v-if="isError">
                Parece que algo deu errado...
            </span>
        </div>
        <v-btn
            @click="send"
            :disabled="loading || files.length <= 0"
            class="primary"
        >
            {{ sendButtonText }}
        </v-btn>
    </v-container>
</template>
<script lang="ts">
import resizeImageFile from "@/utils/image-resize"
import Vue from "vue"
// import { uploadFiles } from '@/utils/gcs';
export default Vue.extend({
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
            return this.loading ? "Enviando" : "Enviar"
        },
    },
    methods: {
        onFileChange(event: Event) {
            const input = event.target as HTMLInputElement
            if (!input?.files?.item(0)) return
            for (let file of input.files) {
                this.files.push(file)
            }
        },
        createImgSrc(file: File): string {
            return URL.createObjectURL(file)
        },
        resizeImage(e: Event): string {
            const img = e.target as HTMLImageElement
            return resizeImageFile(img)
        },
        removeFile(filename: string) {
            const index = this.files.findIndex((x) => x.name == filename)
            if (index < 0) return
            this.files.splice(index, 1)
        },
        async send() {
            this.loading = true

            try {
                // await uploadFiles(this.files);
                this.files.splice(0, this.files.length)
                this.setSuccess()
            } catch (error) {
                console.error(error)
                this.setError()
            }

            this.loading = false
        },
        setSuccess() {
            this.isSuccess = true
            setTimeout(() => (this.isSuccess = false), 5000)
        },
        setError() {
            this.isError = true
            setTimeout(() => (this.isError = false), 10000)
        },
    },
})
</script>
<style></style>
