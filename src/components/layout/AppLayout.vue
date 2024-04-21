<template>
    <bm-box class="bm-app-layout">
        <slot />
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    export default {
        name: 'BmAppLayout',
        components: { BmBox },
        setup() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    .bm-app-layout {
        height: 100%;
        display: flex;
        flex-direction: column;
        //@media(max-width: $bp-tablet) {
        //    display: block;
        //    height: 100%;
        //}
    }
</style>
