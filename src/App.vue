<template>
    <v-app>
        <v-main class="primary">
            <v-container
                class="d-flex align-sm-start align-md-center justify-center"
            >
                <v-row align="center" justify="center">
                    <v-col xs="12" md="6">
                        <v-card class="pa-8">
                            <v-row
                                align="top"
                                justify="center"
                                class="my-sm-12"
                            >
                                <v-col xs="12" md="4">
                                    <v-img
                                        alt="D1"
                                        contain
                                        src="./assets/d1.svg"
                                        transition="scale-transition"
                                        max-width="256"
                                        class="float-md-right mx-auto"
                                    />
                                </v-col>
                                <v-col xs="12" md="4">
                                    <file-upload />
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-footer app>
            <v-btn
                :icon="$vuetify.breakpoint.mobile"
                href="mailto:lz.magnanimous+honor-collector@gmail.com"
            >
                <v-icon :left="$vuetify.breakpoint.sm"> mdi-email </v-icon>
                <span class="hidden-xs-only">E-mail</span>
            </v-btn>
            <v-btn
                :icon="$vuetify.breakpoint.mobile"
                href="https://github.com/lucksma96/honor-collector/"
                target="_blank"
            >
                <v-icon :left="$vuetify.breakpoint.sm"> mdi-github </v-icon>
                <span class="hidden-xs-only">GitHub</span>
            </v-btn>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue"
import FileUpload from "./components/FileUpload.vue"

export default Vue.extend({
    components: { FileUpload },
    name: "App",

    data: () => ({}),
})
</script>
