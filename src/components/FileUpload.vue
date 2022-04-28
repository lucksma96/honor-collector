<template>
    <v-container>
        <input
            v-on:change="onFileChange"
            type="file"
            multiple
            accept="image/*"
            :disabled="loading"
        />

        <div class="file-list">
            <span class="image-counter">
                {{ files.length }} image{{
                    files.length > 1 || files.length == 0 ? "ns" : "m"
                }}
            </span>
            <div v-for="file in files" :key="file.name" class="file-list-item">
                <img
                    :src="createImgSrc(file)"
                    width="64"
                    height="64"
                    class="file-list-item-image"
                    @load="resizeImage"
                />
                <span class="file-list-item-name">{{ file.name }}</span>
                <button
                    @click="removeFile(file.name)"
                    class="file-list-item-remove"
                >
                    &#x2715;
                </button>
            </div>
        </div>
        <div class="status-message" v-if="isSuccess || isError">
            <span class="success" v-if="isSuccess">Imagens enviadas!</span>
            <span class="error" v-if="isError">
                Parece que algo deu errado...
            </span>
        </div>
        <button
            @click="send"
            :disabled="loading || files.length <= 0"
            class="send-button"
        >
            {{ sendButtonText }}
        </button>
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
