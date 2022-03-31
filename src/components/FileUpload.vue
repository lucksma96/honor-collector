<template>
    <input v-on:change="onFileChange" type="file" multiple accept="image/*" capture="environment" />

    <div class="file-list">
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
        <button @click="send">Enviar</button>
    </div>
</template>
<script lang="ts">
import resizeImageFile from '@/utils/image-resize';
import uploadFiles from '@/utils/gcs-file-upload-batch';
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            files: new Array<File>()
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
            await uploadFiles(this.files);
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
    display: inline-block;
    background: #ed1d24;
    border: 1px solid #fff100;
    border-radius: 3px;
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
    margin: 1px;
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
</style>