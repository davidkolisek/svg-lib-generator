<template>
    <div :class="getClassList()">
        <input
            :id="id"
            :name="id"
            :value="dataValue"
            type="checkbox"
            @change="updateValue"
            :checked="isChecked"
            :disabled="disabled"
        />
        <bm-value-label
            :direction="labelDirection"
            :id="id"
            :label="label"
            :translate-html-label="translateHtmlLabel"
            :label-second="labelSecond"
            :label-optional="labelOptional"
            :icon="icon"
            :icon-size="iconSize"
        >
            <template #labelSecond v-if="$slots.labelSecond">
                <slot name="labelSecond" />
            </template>
        </bm-value-label>
        <bm-tooltip v-if="tooltipTitle" :content="tooltipContent" :title="tooltipTitle" />
    </div>
    <bm-error v-if="vuelidate && vuelidate.$errors.length > 0" :errors="vuelidate.$errors" />
</template>

<script>
    import BmValueLabel from '@atoms/forms/labels/ValueLabel.vue'
    import BmTooltip from '@atoms/Tooltip.vue'
    import { computed } from 'vue'
    import useFields from '@/composables/common/fields/useFields.js'
    import BmError from '@atoms/forms/Error.vue'

    export default {
        name: 'BmCheckbox',
        components: { BmError, BmTooltip, BmValueLabel },
        props: {
            id: {
                type: [String, Number],
                required: true
            },
            label: {
                type: String,
                default: ''
            },
            translateHtmlLabel: {
                type: String,
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
            tooltipTitle: {
                type: String,
                default: ''
            },
            tooltipContent: {
                type: [Object, String],
                default: ''
            },
            labelDirection: {
                type: String,
                default: 'horizontal',
                validator: (value) => ['horizontal', 'vertical'].includes(value)
            },
            //definujem width pre checkbox
            width: {
                type: String,
                default: 'fit-content',
                validator: (value) => ['full', 'fit-content'].includes(value)
            },
            icon: {
                type: String,
                default: ''
            },
            iconSize: {
                type: [String, Number],
                default: null
            },
            //TODO kvoli stylovaniu error stavu
            error: {
                type: Boolean,
                default: false
            },

            modelValue: {
                type: [String, Number, Object, Boolean],
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            // vyuzivame len kvoli grupe - samotne checkboxy to nepouzivaju
            checked: {
                type: Boolean,
                default: false
            },
            // vzdy :id a :value
            // data pre checkboxy - hlavne v grupe - ak je dataValue undefined, tak sa pouzije modelValue (true a false)
            dataValue: {
                type: Object,
                default: () => {}
            },
            vuelidate: {
                type: Object,
                default: () => {}
            },
            mutation: {
                type: String,
                default: ''
            }
        },
        emits: ['update:modelValue'],
        setup(props, context) {
            const { updateStore } = useFields()
            const getClassList = () => {
                let list = ['bm-checkbox']
                if (props.tooltipTitle) list.push(`bm-checkbox__has-tooltip`)
                if (props.error) list.push(`bm-checkbox__error`)
                if (props.disabled) list.push(`bm-checkbox__disabled`)
                if (props.labelDirection) list.push(`bm-checkbox__label-${props.labelDirection}`)
                if (props.icon) list.push(`bm-checkbox__icon`)
                if (props.width) list.push(`bm-checkbox__${props.width}`)
                if (
                    props.vuelidate &&
                    props.vuelidate.$errors.length === 0 &&
                    props.vuelidate.$dirty
                )
                    list.push('bm-checkbox-valid')
                return `${list.join(' ')}`
            }

            const updateValue = (event) => {
                if (props.dataValue === undefined) {
                    if (props.mutation === '') {
                        context.emit('update:modelValue', event.target.checked)
                    } else {
                        const payload = {
                            value: event.target.checked
                        }
                        updateStore(props.mutation, payload)
                    }
                } else {
                    const data = props.dataValue
                    if (props.mutation === '') {
                        context.emit('update:modelValue', data)
                    } else {
                        const payload = {
                            value: data
                        }
                        updateStore(props.mutation, payload)
                    }
                }
            }

            const isChecked = computed(() => {
                if (props.checked) return true
                if (props.dataValue === undefined) {
                    return props.modelValue
                } else {
                    return props.modelValue === props.dataValue
                }
            })

            return {
                isChecked,
                getClassList,
                updateValue
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-checkbox {
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
                &:after {
                    border: 1px solid $c-gray-400;
                }
                &:before {
                    border: 1px solid $c-gray-400 !important;
                }
                &:hover {
                    &:after {
                        border-color: $c-gray-400;
                    }
                }
            }
            input[type='checkbox'] {
                &:checked {
                    & + .bm-value-label {
                        &:before {
                            background-image: svg-uri-icon($i-check, $c-black-500, null) !important;
                            background-size: contain;
                            background-position: center center;
                            background-repeat: no-repeat;
                        }
                    }
                }
            }
        }

        input[type='checkbox'] {
            position: absolute;
            visibility: hidden;
            margin: 0;

            & + label {
                padding-left: 24px;
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
                    min-width: 14px;
                    min-height: 14px;
                    width: 14px;
                    height: 14px;
                    left: 0;
                    top: calc(50% - 8px);
                }
            }

            &:checked {
                & + label {
                    &:before {
                        border: 1px solid $c-yellow-500;
                        box-shadow: none;
                        @include create-icon($i-check, $c-yellow-500, null, 12px);
                    }
                }
            }
        }

        &__error {
            //error stav
            input[type='checkbox'] {
                & + label {
                    &:before {
                        background: none;
                        box-shadow: none;
                        border: 1px solid $c-red-500;
                    }
                }
                &:checked {
                    & + label {
                        &:before {
                            border: 1px solid $c-red-500;
                            box-shadow: none;
                            @include create-icon($i-check, $c-red-500, null, 12px);
                        }
                    }
                }
            }
        }
        &__label {
            &-horizontal {
                line-height: 24px;
                &.bm-checkbox__icon {
                    padding: 16px 16px 16px 8px;
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
                            top: calc(50% - 8px) !important;
                        }
                    }
                }
            }
            &-vertical {
                &.bm-checkbox__icon {
                    padding: 25px 16px 8px;
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

        &__has-tooltip {
            &:deep(.bm-tooltip) {
                margin-left: 8px;
                z-index: 1;
                position: relative;
            }
        }
    }
</style>
