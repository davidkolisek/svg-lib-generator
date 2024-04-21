<template>
    <bm-form-wrapper variant="section" class="bm-cover">
        <bm-container>
            <bm-box class="bm-cover-inner">
                <bm-typography component="h1" variant="h1">Lorem ipsum dolor</bm-typography>
                <bm-typography component="p" variant="masive">
                    Lorem ipsum dolor sit amet
                </bm-typography>
            </bm-box>
        </bm-container>
    </bm-form-wrapper>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmFormWrapper from '@atoms/FormWrapper.vue'
    import BmContainer from '@/components/layout/Container.vue'
    import BmTypography from '@atoms/Typography.vue'
    export default {
        name: 'BmCover',
        components: { BmTypography, BmContainer, BmFormWrapper, BmBox },
        setup() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    .bm-cover {
        min-height: 300px;
        position: relative;
        &:after {
            content: '';
            position: absolute;
            width: 400px;
            height: 300px;
            background-image: url('@/assets/images/cover-bg.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            z-index: 5;
            bottom: 5px;
            right: 100px;
        }
        &:before {
            content: '';
            inset: 0;
            z-index: 2;
            position: absolute;
            background: $c-cyan-dark-300;
            opacity: 0.2;
        }
        &-inner {
            position: relative;
            z-index: 3;
            text-align: center;
            &:deep(.bm-typography-h1) {
                color: $c-white-500;
            }
            &:deep(.bm-typography-masive) {
                color: $c-white-500;
            }
        }
    }
</style>
