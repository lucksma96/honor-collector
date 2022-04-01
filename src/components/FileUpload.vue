<template>
    <input v-on:change="onFileChange" type="file" multiple accept="image/*" :disabled="loading" />

    <div class="file-list">
        <span
            class="image-counter"
        >{{ files.length }} image{{ files.length > 1 || files.length == 0 ? "ns" : "m" }}</span>
        <div v-for="file in files" :key="file.name" class="file-list-item">
            <img
                :src="createImgSrc(file)"
                width="64"
                height="64"
                class="file-list-item-image"
                @load="resizeImage"
            />
            <span class="file-list-item-name">{{ file.name }}</span>
            <button @click="removeFile(file.name)" class="file-list-item-remove">&#x2715</button>
        </div>
    </div>
    <div class="status-message" v-if="isSuccess || isError">
        <span class="success" v-if="isSuccess">Imagens enviadas!</span>
        <span class="error" v-if="isError">Parece que algo deu errado...</span>
    </div>
    <button
        @click="send"
        :disabled="loading || files.length <= 0"
        class="send-button"
    >{{ sendButtonText }}</button>
</template>
<script lang="ts">
import resizeImageFile from '@/utils/image-resize';
import { uploadFiles } from '@/utils/gcs-storage';
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
<style>
input[type="file"] {
    /* display: none; */
    color: transparent;
}
input[type="file"]::-webkit-file-upload-button {
    /* visibility: hidden; */
    height: 32px;
    display: inline-block;
    background: #ed1d24;
    border: 1px solid #fff100;
    border-radius: 5px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: none;
    text-transform: capitalize;
    font-weight: bold;
    font-size: 10pt;
    font-variant: small-caps;
}
input[type="file"]:hover::before {
    border-color: black;
}

.file-list {
    display: flex;
    flex-direction: column;
    background: darkolivegreen;
    margin: 16px 0 0 0;
    border-radius: 2px;
}
.image-counter {
    margin: 0 4px 0 4px;
}
.file-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 5px 5px 5px;
    padding: 2px;
    background: rgb(132, 166, 72);
    border-radius: 2px;
}
.file-list-item:first-child {
    margin-top: 5px;
}
.file-list-item::after {
    display: block;
    border: 3px solid lightblue;
}
.file-list-item-image {
    border-radius: 2px;
}
.file-list-item-name {
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 4px 0 4px;
}

.send-button {
    height: 32px;
    width: 100%;
    margin: 16px 0 8px 0;
    background: lightblue;
    border: none;
    border-radius: 5px;
}

.status-message .success {
    color: green;
    margin: 0 4px 0 4px;
}
.status-message .error {
    color: red;
    margin: 0 4px 0 4px;
}
</style>