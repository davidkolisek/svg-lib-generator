import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


const __dirname = path.resolve()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
        '@': path.resolve(__dirname, './src'),
        '@atoms': '/src/components/atoms',
        '@layouts': '/src/components/layouts',
        '@modules': '/src/components/modules',
        '@images': '/src/assets/images',
        '@views': '/src/views',

        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        vuex: 'vuex/dist/vuex.mjs'
    }
  },
  server: {
    host: 'localhost',
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/assets/scss/2-abstracts';
                @import './src/assets/scss/3-base';
           `
      }
    }
  }
})
