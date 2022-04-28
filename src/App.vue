<template>
    <v-app>
        <v-main>
            <v-container>
                <v-card>
                    <v-row align="center" justify="center">
                        <v-col cols="3">
                            <v-img
                                alt="D1"
                                contain
                                src="./assets/d1.svg"
                                transition="scale-transition"
                            />
                        </v-col>
                        <v-col cols="3"> <file-upload /> </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </v-main>
        <v-footer app>
            <!-- -->
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
