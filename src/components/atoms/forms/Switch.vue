<template>
    <div :class="getClassList()">
        <input
            :id="id"
            :name="name ? name : id"
            :checked="modelValue"
            type="checkbox"
            @change="handleChange"
            :disabled="disabled"
        />
        <bm-value-label
            direction="horizontal"
            :id="id"
            :label="labelComputed"
            :label-second="labelSecond"
            :label-optional="labelOptional"
            :tooltip-type="tooltipType"
        >
            <template #labelSecond v-if="$slots.labelSecond">
                <slot name="labelSecond" />
            </template>
        </bm-value-label>
    </div>
    <bm-error v-if="vuelidate && vuelidate.$errors.length > 0" :errors="vuelidate.$errors" />
</template>

<script>
    import BmValueLabel from '@atoms/forms/labels/ValueLabel.vue'
    import { computed } from 'vue'
    import useFields from '@/composables/common/fields/useFields.js'
    import useTimer from '@/composables/common/form/useTimer'
    import BmError from '@atoms/forms/Error.vue'

    export default {
        name: 'BmSwitch',
        components: { BmError, BmValueLabel },
        props: {
            id: {
                type: [String, Number],
                required: true
            },
            name: {
                type: String,
                default: ''
            },
            variant: {
                type: String,
                default: 'default',
                validator: (value) => ['success', 'default'].includes(value)
            },
            labelSecond: {
                type: String,
                default: ''
            },
            label: {
                type: String,
                default: ''
            },
            labelSwitched: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            labelOptional: {
                type: String,
                default: ''
            },
            modelValue: {
                type: [Boolean, Object, Number],
                default: false
            },
            vuelidate: {
                type: Object,
                default: null
            },
            mutation: {
                type: String,
                default: ''
            },
            mutationFlag: {
                type: [String, Number],
                default: ''
            },
            inverse: {
                type: Boolean,
                default: false
            },
            tooltipType: {
                type: [String, Object],
                default: ''
            }
        },
        emits: ['update:modelValue', 'change'],
        setup(props, { emit }) {
            const { updateStore } = useFields()
            const { resetTimer } = useTimer()

            const getClassList = () => {
                let list = ['bm-switch']
                if (props.variant) {
                    list.push(`bm-switch-${props.variant}`)
                }
                if (props.disabled) list.push(`bm-switch-disabled`)
                if (props.inverse) list.push(`bm-switch-inverse`)
                if (props.labelSwitched !== '' && props.modelValue) list.push(`bm-switch__switched`)
                return `${list.join(' ')}`
            }

            const labelComputed = computed(() => {
                if (props.labelSwitched !== '' && props.modelValue) {
                    return props.labelSwitched
                } else {
                    return props.label
                }
            })

            const handleChange = (event) => {
                if (props.mutation === '') {
                    emit('update:modelValue', event.target.checked)
                } else {
                    const payload = {
                        value: event.target.checked,
                        flag: props.mutationFlag
                    }
                    updateStore(props.mutation, payload)
                }
                resetTimer()
                emit('change')
            }

            return {
                getClassList,
                handleChange,
                labelComputed
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-switch {
        input {
            position: absolute;
            visibility: hidden;
            left: -100px;
            & + label {
                position: relative;
                padding: 1px 0 1px 56px;
                cursor: pointer;
                display: block;
                width: fit-content;
                &:deep(.bm-value-label__text-content) {
                    .bm-value-label__label-wrapper {
                        .bm-value-label__text {
                            transition: $trans-primary;
                            font-weight: 400;
                        }
                    }
                }
                &:before,
                &:after {
                    content: '';
                    position: absolute;
                    border-radius: 100px;
                    transition: $trans-primary;
                }
                //background
                &:before {
                    width: 48px;
                    min-width: 48px;
                    height: 24px;
                    background: $c-gray-400;
                    left: 0;
                    z-index: 1;
                    top: calc(50% - 12px);
                }
                //circle
                &:after {
                    background: $c-white-500;
                    width: 16px;
                    height: 16px;
                    z-index: 2;
                    left: 4px;
                    top: calc(50% - 8px);
                }
            }
            &:checked {
                & + label {
                    &:before {
                        background: $c-blue-500;
                        transition: $trans-primary;
                    }
                    &:after {
                        left: 28px;
                        transition: $trans-primary;
                    }
                }
            }
        }
        &-default {
            input {
                &:checked {
                    & + label {
                        &:deep(.bm-label__text) {
                            transition: $trans-primary;
                        }
                        &:before {
                            background: $c-blue-500;
                        }
                    }
                }
            }
        }
        &-success {
            input {
                &:checked {
                    & + label {
                        &:deep(.bm-label__text) {
                            color: $c-green-500;
                            transition: $trans-primary;
                        }
                        &:before {
                            background: $c-green-500;
                        }
                    }
                }
            }
        }
        &-disabled {
            input {
                & + label {
                    &:deep(.bm-value-label__text-content) {
                        .bm-value-label__text {
                            color: $c-gray-500;
                        }
                    }
                    &:hover {
                        cursor: auto;
                    }
                    &:after {
                        background: $c-gray-300;
                    }
                }
            }
        }
        &__switched {
            &:deep(.bm-value-label) {
                .bm-value-label__text {
                    color: $c-green-500;
                }
            }
        }
        &-inverse {
            input {
                & + label {
                    &:before {
                        background: $c-blue-500;
                        transition: $trans-primary;
                    }
                    &:after {
                        left: 28px;
                        transition: $trans-primary;
                    }
                }
                &:checked {
                    & + label {
                        &:after {
                            left: 4px;
                        }
                        &:before {
                            width: 48px;
                            min-width: 48px;
                            height: 24px;
                            background: $c-gray-400;
                            left: 0;
                            z-index: 1;
                            top: 0;
                        }
                    }
                }
            }
        }
    }
</style>
