<template>
    <div class="grid">
        <div class="col-12">
            <div class="intro">
                <bm-container>
                    <for-vanila-js />
                    <for-vue />
                </bm-container>
            </div>
        </div>
    </div>
</template>

<script>
    import BmContainer from '@/components/layout/Container.vue'
    import ForVanilaJs from './partials/ForVanilaJs.vue'
    import ForVue from './partials/ForVue.vue'

    export default {
        name: 'HomeView',
        components: {
            BmContainer,
            ForVanilaJs,
            ForVue
        },
        setup() {
            return {}
        }
    }
</script>
