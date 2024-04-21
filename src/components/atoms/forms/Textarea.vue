<template>
    <div :class="getClassListWrapper()">
        <bm-form-label
            v-if="label.length > 0"
            :label="label"
            :description="description"
            :id="id"
            :direction="labelDirection"
        />
        <textarea
            :name="name"
            :id="id"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            :placeholder="placeholder"
            :disabled="disabled"
        ></textarea>
        <bm-error v-if="error && label" error-message="Error text" />
    </div>
</template>

<script>
    import BmFormLabel from '@atoms/forms/labels/FormLabel.vue'
    import BmError from '@atoms/forms/Error.vue'
    import useFields from '@/composables/common/fields/useFields.js'

    export default {
        name: 'BmTextarea',
        components: { BmError, BmFormLabel },
        props: {
            id: {
                type: String,
                required: true
            },
            error: {
                // toto tu asi nebude neviem ako sa dohodneme
                type: Boolean,
                default: false
            },
            //placeholder
            placeholder: {
                type: String,
                default: undefined
            },
            name: {
                type: String,
                default: undefined
            },
            type: {
                type: String,
                default: 'text'
            },
            label: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            },
            labelDirection: {
                type: String,
                default: 'vertical',
                validator: (value) => {
                    return ['vertical', 'horizontal'].includes(value)
                }
            },
            //vuelidate object
            vuelidate: {
                type: Object,
                default: null
            },
            mutation: {
                type: String,
                default: ''
            },
            mutationFlag: {
                type: String,
                default: ''
            },
            lazy: {
                type: Boolean,
                default: true
            },

            disabled: {
                type: Boolean,
                default: false
            },
            //resetne vuelidate object na focus inputu - aby tam nesvietil error
            resetOnFocus: {
                type: Boolean,
                default: true
            },
            // flag ktory definuje ci chcem validovat na touch alebo nie
            touchOnBlur: {
                type: Boolean,
                default: false
            }
        },
        emits: ['update:modelValue'],
        setup(props, { emit }) {
            const { updateStore } = useFields()

            const getClassListWrapper = () => {
                const list = ['bm-textarea']
                if (props.error) list.push('bm-textarea__error')
                if (props.valid) list.push('bm-textarea__valid')
                if (props.disabled) list.push('bm-textarea__disabled')
                if (props.placeholder !== undefined) list.push('bm-textarea__placeholder')

                return list.join(' ')
            }

            const handleInput = (event) => {
                !props.lazy ? updateValue(event.target.value) : ''
            }

            const handleBlur = () => {
                props.lazy ? updateValue(event.target.value) : ''

                if (props.touchOnBlur && props.vuelidate) {
                    props.vuelidate.$touch()
                }
            }

            const handleFocus = () => {
                if (props.resetOnFocus && props.vuelidate) {
                    props.vuelidate.$reset()
                }
            }

            const updateValue = (value) => {
                if (props.mutation === '') {
                    emit('update:modelValue', value)
                } else {
                    const payload = {
                        value: value,
                        flag: props.mutationFlag
                    }
                    updateStore(props.mutation, payload)
                }
            }

            return {
                getClassListWrapper,
                handleInput,
                handleFocus,
                handleBlur
            }
        }
    }
</script>

<style scoped lang="scss">
    .bm-textarea {
        display: flex;
        flex-direction: column;
        & > :deep(.bm-label) {
            margin-bottom: 8px;
        }
        textarea {
            font-family: $f-primary;
            font-size: 16px;
            line-height: 24px;
            border: 1px solid $c-gray-400;
            border-radius: $br-small;
            min-height: 130px;
            padding: 8px 36px 8px 16px;
            resize: vertical;
            overflow: auto;
            @include placeholder() {
                color: $c-gray-400;
            }
            &:focus-within,
            &:focus {
                border-color: $c-blue-500;
                outline: none;
            }

            &:hover {
                border-color: $c-gray-500;
            }
        }

        &__error {
            textarea {
                border-color: $c-red-500;
            }
        }
        &__valid {
            textarea {
                background-image: svg-uri-icon($i-check, $c-green-500, null);
                background-size: 16px 16px;
                background-repeat: no-repeat;
                background-position: right 16px top 13px;
            }
        }
        &:deep(.bm-error) {
            margin-top: 4px;
        }
        &__disabled {
            textarea {
                border: 1px solid $c-gray-400;
                background: $c-gray-400;
                resize: unset;
                &:hover {
                    border: 1px solid $c-gray-400;
                }
            }
        }
    }
</style>
