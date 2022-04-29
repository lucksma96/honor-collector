import Vue from "vue"
import Vuetify from "vuetify/lib"
import pt from "vuetify/src/locale/pt"
import colors from "vuetify/lib/util/colors"

Vue.use(Vuetify)

export default new Vuetify({
    breakpoint: { mobileBreakpoint: "md" },
    theme: {
        themes: {
            light: {
                primary: colors.blue,
                secondary: colors.shades.white,
                tertiary: colors.green.darken1,
                accent: colors.yellow.accent3,
            },
        },
    },
    lang: {
        locales: { pt },
        current: "pt",
    },
})
