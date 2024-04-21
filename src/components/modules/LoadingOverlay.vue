<template>
    <div class="is-loading">
        <bm-progress-circular :variant="'purple'" />
    </div>
</template>

<script>
    import BmProgressCircular from '@atoms/ProgressCircular.vue'
    export default {
        name: 'LoadingOverlay',
        components: { BmProgressCircular },
        setup() {}
    }
</script>

<style lang="scss" scoped>
    .is-loading {
        position: absolute;
        inset: 0;
        background: $c-white-500;
        z-index: 999;
        &:deep(.bm-progress-circular) {
            position: absolute;
            top: calc(50% - 25px);
            left: calc(50% - 25px);
        }
        h2 {
            color: white;
            text-align: center;
            margin-top: 50vh;
        }
    }
</style>
