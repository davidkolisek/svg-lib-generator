<template>
    <bm-container>
        <bm-box class="auth-box-layout">
            <bm-box class="auth-box auth-box-left">
                <slot name="leftPart" />
            </bm-box>
            <bm-box class="auth-box auth-box-right">
                <slot name="rightPart" />
            </bm-box>
        </bm-box>
    </bm-container>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmContainer from '@/components/layout/Container.vue'
    export default {
        name: 'AuthBoxLayout',
        components: { BmContainer, BmBox },
        setup() {}
    }
</script>

<style lang="scss" scoped>
    .auth-box-layout {
        max-width: 1500px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        background: $c-white-500;
        border-radius: $br-large;
        box-shadow: $bs-soft;
        @media (max-width: $bp-tablet) {
            flex-direction: column;
            border-radius: $br-medium;
        }
        .auth-box {
            min-height: 80vh;
            @media (max-width: $bp-tablet) {
                min-height: unset;
            }

            &-left {
                flex: 1 1 50%;
                overflow: hidden;
                padding: 16px;
                @media (max-width: $bp-tablet) {
                    display: none;
                    flex: 1 1 0;
                }
                &:deep(img) {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-top-left-radius: 16px;
                    border-bottom-left-radius: 16px;
                    opacity: 0.8;
                }
            }
            &-right {
                flex: 1 1 50%;
                padding: 60px 120px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                @media (max-width: $bp-tablet) {
                    flex: 1 1 100%;
                    padding: 30px 20px;
                }
            }
        }
    }
</style>
