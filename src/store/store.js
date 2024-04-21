import { createStore, createLogger } from 'vuex'
import configModule from '@/store/modules/configModule.js'

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        config: configModule
    },
    plugins: [createLogger({})]
})
