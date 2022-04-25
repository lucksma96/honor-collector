<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="text-center" align="center" justify="center">
          <v-col cols="12" md="4">
            <v-img :src="logo" class="my-3" contain height="200" />
          </v-col>
          <v-col md="auto" sm="8" xs="12" class="mb-4">
            <file-upload />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app>
      <span>Contato: <a
          href="mailto:lz.magnanimous+honor-collector@gmail.com">lz.magnanimous+honor-collector@gmail.com</a></span>
    </v-footer>
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
