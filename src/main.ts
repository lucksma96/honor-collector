import Vue from "vue"
import App from "@/App.vue"
import vuetify from "@/vuetify"
import startFirebase from "@/firebase"

startFirebase()

Vue.config.productionTip = false

new Vue({
    vuetify,
    render: (h) => h(App),
}).$mount("#app")
