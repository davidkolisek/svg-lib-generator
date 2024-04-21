<template>
    <bm-box component="footer" class="bm-footer">footer</bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    export default {
        name: 'BmFooter',
        components: { BmBox },
        setup() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    .bm-footer {
    }
</style>
