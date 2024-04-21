import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import { createI18n } from 'vue-i18n'
import { enTrans } from '@/translations/en.js'
import mitt from 'mitt'

import PrimeVue from 'primevue/config'
import { skTrans } from '@/translations/sk.js'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

export const i18n = createI18n({
    composition: true,

    legacy: false, // you must set `false`, to use Composition API
    locale: 'en', // window.document.getElementsByTagName('html')[0]
    messages: {
        en: enTrans,
        sk: skTrans
    }
})

const emitter = mitt()

const initApp = createApp(App)

initApp.config.globalProperties.$trans = (key) => {
    return i18n.global.t(key)
}

async function createVueApp() {
    await app // Wait for Firebase to initialize and fetch data if necessary

    initApp.use(store)
    initApp.use(router)
    initApp.use(i18n)
    initApp.use(PrimeVue)
    initApp.provide('emitter', emitter)

    initApp.mount('#app')
}

createVueApp()
