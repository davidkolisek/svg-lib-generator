<template>
    <bm-box class="bm-navbar">
        <bm-box class="person-name" v-if="isAuth">
            <u-person-initials :name="userName" />
        </bm-box>
        <button v-if="isAuth" @click="logout">logout</button>
        <ul>
            <li>
                <router-link :to="{ name: 'HomeView' }">Home</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'SigninView' }">Login</router-link>
            </li>
            <li v-if="isAuth">
                <router-link :to="{ name: 'AdminDashboardView' }">Dashboard</router-link>
            </li>
            <li v-if="isAuth">
                <router-link :to="{ name: 'AdminProductsView' }">Admin products</router-link>
            </li>
            <li v-if="isAuth">
                <router-link :to="{ name: 'AdminAddProductView' }">Add product</router-link>
            </li>
            <li v-if="isAuth">
                <router-link :to="{ name: 'AdminProductDetailView' }">
                    Product detail view
                </router-link>
            </li>
        </ul>
    </bm-box>
</template>

<script>
    import { useStore } from 'vuex'
    import useUser from '@/composables/useUser.js'
    import { useRouter } from 'vue-router'
    import BmBox from '@/components/layout/Box.vue'
    import UPersonInitials from '@atoms/PersonInitials.vue'
    import { computed } from 'vue'
    export default {
        name: 'BmNavbar',
        components: { UPersonInitials, BmBox },
        setup() {
            const store = useStore()
            const { isAuth } = useUser()
            const userName = computed(() => store.getters['auth/getUserName'])

            const router = useRouter()

            const logout = async () => {
                await store.dispatch('auth/logout')
                await router.push('/')
            }
            return { store, logout, isAuth, userName }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-navbar {
    }
</style>
