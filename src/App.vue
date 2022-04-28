<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <v-img
                    alt="D1"
                    class="shrink mr-2"
                    contain
                    src="./assets/d1.svg"
                    transition="scale-transition"
                    width="40"
                />
            </div>
        </v-app-bar>

        <v-main> </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
    name: "App",

    data: () => ({
        //
    }),
})
</script>
