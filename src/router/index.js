import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@views/public/home/HomeView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        //public
        { path: '/', component: HomeView, name: 'HomeView' }
    ]
})

export default router
