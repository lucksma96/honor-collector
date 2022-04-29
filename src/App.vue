<template>
    <v-app>
        <v-main class="primary align-sm-start align-md-center justify-center">
            <v-container>
                <v-card class="pa-6">
                    <v-row align="top" justify="center">
                        <v-col align-self="center">
                            <v-img
                                alt="D1"
                                contain
                                src="./assets/d1.svg"
                                transition="scale-transition"
                                width="256"
                                class="float-sm-none float-md-right"
                            />
                        </v-col>
                        <v-col cols="6">
                            <file-upload />
                        </v-col>
                    </v-row>
                </v-card>
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
