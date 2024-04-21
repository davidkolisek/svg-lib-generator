<template>
    <bm-box :class="getClassList()">
        <bm-box class="bm-action-label-text-item__left">
            <!--      moze vstupovat ako prop-->
            <bm-icon
                size="16"
                :icon="
                    variant === 'success'
                        ? 'circle-check'
                        : variant === 'disabled'
                        ? 'circle-xmark'
                        : ''
                "
                :color="variant === 'success' ? '#03B675' : variant === 'disabled' ? '#A6B7C7' : ''"
            />
            <bm-typography v-if="label" component="p">
                {{ label }}
            </bm-typography>
            <!--      moze vstupovat ako slot-->
            <slot name="label" />
        </bm-box>
        <bm-box class="bm-action-label-text-item__right">
            <!--      moze vstupovat ako slot-->
            <slot name="value" />
            <!--      moze vstupovat ako prop-->
            <bm-typography v-if="value" component="p">
                {{ value }}
            </bm-typography>
            <bm-box v-if="actionClick" class="action-btn" @click="actionClick">
                <bm-icon icon="chevron-right" size="10" />
            </bm-box>
        </bm-box>
    </bm-box>
</template>
<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmTypography from '@atoms/Typography.vue'
    import BmIcon from '@atoms/Icon.vue'

    export default {
        name: 'BMActionLabelTextItem',
        components: { BmIcon, BmTypography, BmBox },
        props: {
            label: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            actionClick: {
                type: Function,
                default: null
            },
            variant: {
                type: String,
                default: 'success',
                validator: (value) => {
                    return ['success', 'disabled'].includes(value)
                }
            }
        },
        setup(props) {
            const getClassList = () => {
                const list = ['bm-action-label-text-item']
                if (props.variant) {
                    list.push(`bm-action-label-text-item__${props.variant}`)
                }
                return list.join(' ')
            }
            return {
                getClassList
            }
        }
    }
</script>

<style scoped lang="scss">
    .bm-action-label-text-item {
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 12px 0 12px 24px;
        position: relative;
        &:after {
            content: '';
            bottom: 0;
            right: 0;
            left: 24px;
            position: absolute;
            height: 1px;
        }
        &__right,
        &__left {
        }
        &__left {
            display: flex;
            align-items: flex-start;
            :deep(.bm-icon) {
                margin: 0 8px 0 0;
                position: absolute;
                left: 0;
                top: 16px;
                svg {
                    min-width: 16px;
                }
            }
            :deep(.bm-typography) {
                line-height: 1.5;
            }
        }
        &__right {
            min-width: 100px;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            .action-btn {
                width: 20px;
                min-width: 20px;
                height: 20px;
                margin-left: 8px;
                justify-content: center;
                align-items: center;
                display: flex;
                cursor: pointer;
                &:before {
                    content: '';
                    inset: 0;
                    position: absolute;
                    z-index: 2;
                    cursor: pointer;
                }
            }
        }
        &__disabled {
            .bm-action-label-text-item__left,
            .bm-action-label-text-item__right {
                p,
                span {
                    color: $c-gray-500 !important;
                }
            }
        }
    }
</style>
