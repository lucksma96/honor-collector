<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="text-center" justify="center">
          <v-col cols="12">
            <v-img :src="logo" class="my-3" contain height="200" />
          </v-col>
          <v-col lg="4" md="6" sm="8" xs="12" class="mb-4">
            <file-upload />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import logo from './assets/d1.svg'
import FileUpload from './components/FileUpload.vue'

export default defineComponent({
  name: 'App',
  components: { FileUpload },
  data() {
    return {
      logo,
    }
  },
})
</script>
