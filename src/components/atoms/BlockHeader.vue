<template>
    <div class="bm-block-header">
        <bm-typography component="p" variant="h3" font-weight="800" color="black">
            {{ title }}
        </bm-typography>
        <div class="action-wrapper">
            <div v-if="actionClick" class="btn-wrapper" @click="actionClick">
                <bm-icon :icon="actionIcon" size="16" :color="actionIconColor" />
            </div>
            <slot name="action" />
        </div>
    </div>
</template>

<script>
    import BmIcon from '@atoms/Icon.vue'
    import BmTypography from '@atoms/Typography.vue'

    export default {
        name: 'BmBlockHeader',
        components: { BmIcon, BmTypography },
        props: {
            title: {
                type: String,
                default: ''
            },
            titleIcon: {
                type: String,
                default: 'info'
            },
            actionIcon: {
                type: String,
                default: 'pencil'
            },
            actionIconColor: {
                type: String,
                default: '#272727'
            },
            // ked kliknem na ikonku na pravej strane
            actionClick: {
                type: Function,
                default: null
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-block-header {
        display: flex;
        align-items: center;
        width: 100%;
        //border-bottom: 1px solid $c-gray-300;
        & > :deep(.bm-icon) {
            line-height: 0;
            margin: 0 8px 0 0;
            & > svg {
                min-width: 16px;
                min-height: 16px;
                @media (min-width: $bp-mobile) {
                    min-width: 20px;
                    width: 20px;
                    height: 20px;
                }
            }
        }
        &:deep(.bm-typography) {
            margin: 0 8px 0 0;
            font-family: $f-secondary;
        }
        .btn-wrapper {
            margin: 0 0 0 auto;
            cursor: pointer;
            & > :deep(.bm-icon) {
                line-height: 0;
                & > svg {
                    margin-top: 3px;
                    min-width: 16px;
                    min-height: 16px;
                }
            }
        }
        .action-wrapper {
            margin-left: auto;
        }
    }
</style>
