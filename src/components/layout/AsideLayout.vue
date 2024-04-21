<template>
    <bm-box class="aside-layout">
        <bm-box class="aside-left">
            <slot name="asideLeft" />
        </bm-box>
        <bm-box class="aside-right">
            <bm-box class="aside-right-header">
                <slot name="asideRightTop" />
            </bm-box>
            <bm-box class="aside-right-content">
                <slot name="asideRight" />
            </bm-box>
        </bm-box>
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'

    export default {
        name: 'BmAsideLayout',
        components: { BmBox },
        setup() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    .aside-layout {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        @media (max-width: $bp-tablet) {
            padding: 0 0 71px 0;
            display: block;
        }

        .aside {
            &-left {
                width: auto;
            }

            &-right {
                width: 100%;
                overflow-y: scroll;
                height: 100vh;
                display: flex;
                flex-direction: column;
                @media (max-width: $bp-tablet) {
                    overflow-y: unset;
                    height: auto;
                }

                .aside-right-header {
                    @media (max-width: $bp-tablet) {
                        position: sticky;
                        top: 0;
                    }
                }
                .aside-right-content {
                    width: 100%;
                    padding: 0 16px;
                    @media (max-width: $bp-tablet) {
                        padding: 0 0 24px;
                    }
                }
            }
        }
    }
</style>
