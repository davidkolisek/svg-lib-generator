<template>
    <bm-box component="main" class="bm-main">
        <slot />
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    export default {
        name: 'BmMain',
        components: { BmBox },
        setup() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    .bm-main {
        flex: 1;
    }
</style>
