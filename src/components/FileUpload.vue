<template>
    <v-container class="d-flex d-sm-block flex-column">
        <input
            :disabled="loading"
            ref="fileInput"
            type="file"
            multiple
            accept="image/*"
            hidden
            @change="onFileChange"
        />
        <v-btn
            :block="$vuetify.breakpoint.smAndUp"
            class="primary mx-auto mb-3"
            @click="$refs.fileInput.click()"
        >
            <v-icon left>mdi-camera</v-icon> Escolher imagens
        </v-btn>

        <v-list
            outlined
            rounded
            class="align-self-stretch mx-auto"
            max-width="70vw"
        >
            <v-subheader>
                {{ imageCounter }}
            </v-subheader>
            <v-list-item v-for="file in files" :key="file.name">
                <v-list-item-avatar>
                    <img
                        :src="thumbnails.get(file.name)"
                        alt="Miniatura da foto"
                        width="64"
                        height="64"
                        style="object-fit: cover"
                    />
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-text="file.name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn icon color="primary" @click="removeFile(file.name)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
        <div class="mt-2">
            <v-alert v-model="isSuccess" dismissible type="success">
                Imagens enviadas!
            </v-alert>
            <v-alert v-model="isError" dismissible type="error">
                Parece que algo deu errado...
            </v-alert>
        </div>
        <v-btn
            :disabled="loading || files.length <= 0"
            class="accent black--text mx-auto mt-2"
            @click="send"
        >
            {{ sendButtonText }}
        </v-btn>
    </v-container>
</template>
<script lang="ts">
import Vue from "vue"
import { uploadFiles } from "@/utils/gcs"
export default Vue.extend({
    data() {
        return {
            files: new Array<File>(),
            thumbnails: new Map<string, string>(),
            loading: false,
            isSuccess: false,
            isError: false,
        }
    },
    computed: {
        sendButtonText(): string {
            return this.loading ? "Enviando" : "Enviar"
        },
        imageCounter(): string {
            const isSingular = this.files.length == 1
            return `${this.files.length} image${isSingular ? "m" : "ns"}`
        },
    },
    methods: {
        onFileChange(event: Event) {
            const input = event.target as HTMLInputElement
            if (!input?.files?.item(0)) return
            for (let file of input.files) {
                this.files.push(file)
                this.thumbnails.set(file.name, this.createImgSrc(file))
            }
        },
        createImgSrc(file: File): string {
            return URL.createObjectURL(file)
        },
        removeFile(filename: string) {
            const index = this.files.findIndex((x) => x.name == filename)
            if (index < 0) return
            this.files.splice(index, 1)
        },
        async send() {
            this.loading = true

            try {
                await uploadFiles(this.files)
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
        },
    },
})
</script>
<style></style>
