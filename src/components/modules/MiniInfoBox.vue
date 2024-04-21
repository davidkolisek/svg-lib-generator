<template>
    <bm-box class="bm-mini-info-box">
        <bm-base-card :variant="variant">
            <bm-box class="mini-content">
                <bm-typography component="p" variant="caption" class="mini-title" font-weight="600">
                    {{ title }}
                </bm-typography>
                <bm-typography component="p" variant="h3" class="mini-value">
                    {{ value }}
                </bm-typography>
            </bm-box>
            <bm-box class="mini-icon">
                <bm-icon :icon="icon" />
            </bm-box>
        </bm-base-card>
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmTypography from '@atoms/Typography.vue'
    import BmBaseCard from '@atoms/BaseCard.vue'
    import BmIcon from '@atoms/Icon.vue'
    export default {
        name: 'BmMiniInfoBox',
        components: { BmIcon, BmBaseCard, BmTypography, BmBox },
        props: {
            title: {
                type: String,
                default: ''
            },
            value: {
                type: [String, Number],
                default: ''
            },
            variant: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            }
        },
        setup() {
            const getClassList = () => {
                let list = ['bm-mini-info-box']
                // if (props.variant) {
                //     list.push(`bm-app-link-${props.variant}`)
                // }
                return list
            }
            return { getClassList }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-mini-info-box {
        &:deep(.bm-base-card) {
            .bm-base-card__content {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .mini {
                    &-content {
                        display: flex;
                        flex-direction: column;
                        .mini-title {
                        }
                        .mini-value {
                        }
                    }
                    &-icon {
                        margin-left: 16px;
                        .bm-icon {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 48px;
                            height: 48px;
                            border-radius: $br-semi-small;
                            box-shadow: $bs-new-light;
                            svg {
                                width: 18px;
                                height: 18px;
                            }
                        }
                    }
                }
            }

            &.bm-base-card__white {
                .bm-base-card__content {
                    .mini {
                        &-content {
                            .mini-title {
                                color: $c-gray-400;
                            }
                            .mini-value {
                            }
                        }
                        &-icon {
                            .bm-icon {
                                background: $c-purple-gradient-main;
                                //background: $c-dark-gray-gradient-main;
                                svg {
                                    path {
                                        fill: $c-white-500;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            &.bm-base-card__dark-gray {
                background: $c-gray-gradient-main;
                .bm-base-card__content {
                    .mini {
                        &-content {
                            .mini-title {
                                color: $c-white-500;
                            }
                            .mini-value {
                                color: $c-white-500;
                            }
                        }
                        &-icon {
                            .bm-icon {
                                background: $c-white-500;
                                svg {
                                    path {
                                        fill: $c-cyan-dark-400;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
