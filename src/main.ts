import { createApp } from 'vue'
import App from './App.vue'
import startFirebase from './utils/firebase'

createApp(App).mount('#app')

startFirebase()