<template>
    <div :class="getClassList()">
        <input
            :id="id"
            :name="name"
            type="radio"
            :value="value"
            @change="updateValue"
            :checked="isChecked"
            :disabled="disabled"
        />
        <slot v-if="!label" name="label" />
        <bm-value-label
            v-else
            :direction="labelDirection"
            :id="id"
            :label="label"
            :label-optional="labelOptional"
            :label-align="labelAlign"
            :label-second="labelSecond"
            :icon="icon"
            :icon-size="iconSize"
        >
            <template #labelSecond v-if="$slots.labelSecond">
                <slot name="labelSecond" />
            </template>
        </bm-value-label>
        <bm-tooltip v-if="tooltipTitle" :content="tooltipContent" :title="tooltipTitle" />
    </div>
</template>

<script>
    import BmValueLabel from '@atoms/forms/labels/ValueLabel.vue'
    import BmTooltip from '@atoms/Tooltip.vue'
    import { computed } from 'vue'
    import useFields from '@/composables/common/fields/useFields'

    export default {
        name: 'BmRadiobox',
        components: { BmTooltip, BmValueLabel },
        props: {
            id: {
                type: [String, Number],
                required: true
            },
            name: {
                type: [String, Number],
                required: true
            },
            label: {
                type: String,
                default: ''
            },
            // mapovana value pre radiobox
            value: {
                type: [String, Number],
                default: ''
            },
            labelSecond: {
                type: String,
                default: ''
            },
            labelOptional: {
                type: String,
                default: ''
            },
            labelDirection: {
                type: String,
                default: 'horizontal',
                validator: (value) => ['horizontal', 'vertical'].includes(value)
            },
            tooltipTitle: {
                type: String,
                default: ''
            },
            tooltipContent: {
                type: [Object, String],
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
            //definujem width pre radio
            width: {
                type: String,
                default: 'fit-content',
                validator: (value) => ['full', 'fit-content'].includes(value)
            },
            iconSize: {
                type: [String, Number],
                default: 24
            },
            //TODO kvoli stylovaniu error stavu
            error: {
                type: Boolean,
                default: false
            },
            modelValue: {
                type: [String, Object, Number, Boolean],
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            vuelidate: {
                type: Object,
                default: () => ({})
            },
            mutation: {
                type: String,
                default: ''
            },
            labelAlign: {
                type: String,
                default: '',
                validator: (value) => ['left', 'right', ''].includes(value)
            }
        },
        emits: ['update:modelValue'],
        setup(props, context) {
            const { updateStore } = useFields()

            const getClassList = () => {
                let list = ['bm-radiobox']
                if (props.tooltipTitle) list.push(`bm-radiobox__has-tooltip`)
                if (props.icon) list.push(`bm-radiobox__icon`)
                if (props.labelDirection) list.push(`bm-radiobox__label-${props.labelDirection}`)
                if (props.error) list.push(`bm-radiobox__error`)
                if (props.disabled) list.push(`bm-radiobox__disabled`)
                if (props.width) list.push(`bm-radiobox__${props.width}`)
                if (props.labelAlign) list.push(`bm-radiobox__label-align-${props.labelAlign}`)

                return `${list.join(' ')}`
            }

            const updateValue = (event) => {
                if (props.mutation === '') {
                    context.emit('update:modelValue', event.target.value)
                } else {
                    const payload = {
                        value: event.target.value
                    }
                    updateStore(props.mutation, payload)
                }
            }

            const isChecked = computed(() => {
                if (props.value === undefined) {
                    return props.modelValue
                } else {
                    return props.modelValue === props.value
                }
            })

            return {
                getClassList,
                updateValue,
                isChecked
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-radiobox {
        display: flex;
        align-items: center;
        position: relative;
        //natahujem checkbox a label na 100%
        &__full {
            width: 100%;
            &:deep(.bm-value-label) {
                width: 100%;
            }
        }
        &__fit-content {
            width: fit-content;
        }
        //global styl pre disabled checkbox
        &__disabled {
            .bm-value-label {
                &:before {
                    //border: 1px solid $c-gray-400 !important;
                }
                &:hover {
                    &:after {
                        //  border-color: $c-gray-400;
                    }
                }
            }
            input[type='radio'] {
                &:checked {
                    & + .bm-value-label {
                        &:before {
                            //   background-image: svg-uri-icon(
                            //      $i-circle-full,
                            //     $c-gray-500-darker,
                            //      null
                            //  ) !important;
                            background-size: 8px;
                            background-position: center center;
                            background-repeat: no-repeat;
                        }
                        :deep(.bm-value-label__text-content) {
                            //color: $c-dark-main !important;
                            .bm-value-label__text {
                                //    color: $c-dark-main !important;
                            }
                        }
                    }
                }
            }
        }

        input[type='radio'] {
            position: absolute;
            visibility: hidden;
            margin: 0;

            & + label {
                padding-left: 26px;
                position: relative;
                cursor: pointer;

                &:deep(span) {
                    &.bm-value-label__text,
                    &.bm-value-label__text-second {
                        font-weight: 400;
                    }
                }

                &:before {
                    content: '';
                    position: absolute;
                    min-width: 16px;
                    min-height: 16px;
                    width: 16px;
                    height: 16px;
                    //border: 1px solid $c-gray-400;
                    border-radius: 100px;
                    left: 0;
                    top: calc(50% - 8px);
                    //box-shadow: $bs-inset-1;
                }
            }

            &:checked {
                & + label {
                    &:before {
                        //border: 1px solid $c-blue-main;
                        box-shadow: none;
                        // @include create-icon($i-circle-full, $c-blue-main, null, 8px);
                        background-size: 8px 8px;
                    }
                }
            }
        }

        &__error {
            //error stav
            input[type='radio'] {
                & + label {
                    &:before {
                        background: none;
                        box-shadow: none;
                        //border: 1px solid $c-red-500;
                    }
                }

                &:checked {
                    & + label {
                        &:before {
                            //border: 1px solid $c-red-500;
                            box-shadow: none;
                            // @include create-icon($i-circle-full, $c-red-500, null, 8px);
                            background-size: 8px 8px;
                        }
                    }
                }
            }
        }
        &__has-tooltip {
            &:deep(.bm-tooltip) {
                margin-left: 8px;
                z-index: 1;
                position: relative;
            }
        }

        &__label {
            &-horizontal {
                line-height: 21px;
                &.bm-radiobox__icon {
                    padding: 16px 8px;
                    &:deep(.bm-value-label) {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .bm-value-label__icon {
                            display: flex;
                        }
                        .bm-value-label__text-content {
                            .bm-value-label__label-wrapper {
                                display: flex;
                                flex-direction: column;
                            }
                            .bm-value-label__optional {
                                margin-left: 0;
                                line-height: 18px;
                            }
                        }
                        &:before {
                            top: calc(50% - 9px) !important;
                        }
                    }
                }
            }
            &-vertical {
                &.bm-radiobox__icon {
                    padding: 25px 8px 8px;
                    &:deep(.bm-value-label) {
                        padding-left: 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        .bm-value-label__icon {
                            display: flex;
                            svg {
                                margin-right: 0 !important;
                            }
                        }
                        .bm-value-label__text-content {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            .bm-value-label__optional {
                                margin-left: 0;
                                line-height: 18px;
                            }
                        }
                        &:before {
                            top: 8px !important;
                        }
                    }
                }
            }
        }
    }
</style>
