<template>
    <bm-box :class="getClassList()">
        <bm-icon :icon="computedIcon" size="16" />
        <bm-typography component="p">
            {{ text }}
        </bm-typography>
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmTypography from '@atoms/Typography.vue'
    import BmIcon from '@atoms/Icon.vue'
    import { computed } from 'vue'

    export default {
        name: 'BmAlertMessageBase',
        components: { BmIcon, BmTypography, BmBox },
        props: {
            text: {
                type: String,
                default: ''
            },
            variant: {
                type: String,
                default: 'success'
            }
        },
        setup(props) {
            const getClassList = () => {
                const list = ['bm-alert-base']
                if (props.variant) {
                    list.push(`bm-alert-base-${props.variant}`)
                }
                return list.join(' ')
            }

            const computedIcon = computed(() => {
                switch (props.variant) {
                    case 'success':
                        return 'circle-check'
                    case 'error':
                        return 'circle-xmark'
                    case 'warning':
                        return 'warning'
                    case 'info':
                        return 'info'
                    default:
                        return 'info'
                }
            })

            return { getClassList, computedIcon }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-alert-base {
        width: 300px;
        bottom: 0;
        padding: 16px;
        border-radius: $br-medium;
        box-shadow: $bs-modern-soft;
        font-size: 1rem;
        display: flex;
        align-items: center;
        width: 100%;
        &:deep(.bm-icon) {
            cursor: pointer;
            display: flex;
            margin-right: 16px;
            svg {
                width: 20px;
                height: 20px;
                path {
                    fill: $c-white-500;
                }
            }
        }
        &:deep(.bm-typography) {
            color: $c-white-500 !important;
        }
        &-success {
            background-color: $c-green-400;
            color: $c-white-500;
            &:deep(.bm-icon) {
                svg {
                    path {
                        fill: $c-green-100;
                    }
                }
            }
            &:deep(.bm-typography) {
                color: $c-green-50;
            }
        }
        &-error {
            background-color: $c-red-400;
            color: $c-white-500;
            &:deep(.bm-icon) {
                svg {
                    path {
                        fill: $c-red-100;
                    }
                }
            }
            &:deep(.bm-typography) {
                color: $c-red-50;
            }
        }
        &-warning {
            background-color: $c-yellow-400;
            color: $c-white-500;
            &:deep(.bm-icon) {
                svg {
                    path {
                        fill: $c-yellow-100;
                    }
                }
            }
            &:deep(.bm-typography) {
                color: $c-yellow-50;
            }
        }
        &-info {
            background-color: $c-blue-200;
            color: $c-white-500;
            &:deep(.bm-icon) {
                svg {
                    path {
                        fill: $c-blue-100;
                    }
                }
            }
            &:deep(.bm-typography) {
                color: $c-blue-50;
            }
        }
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(100%);
        }
        to {
            opacity: 1;
            transform: translateY(-50%);
        }
    }
</style>
