<template>
    <bm-form-label
        v-if="label"
        :label="label"
        :description="description"
        :id="id"
        :direction="labelDirection"
        :tooltip-type="tooltipType"
        :tooltip-icon="tooltipIcon"
    />

    <div :class="getClassListWrapper()">
        <div v-if="prefix" class="prefix">{{ prefix }}</div>
        <input
            :id="id"
            :value="modelValue"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            :type="type"
            :placeholder="placeholder"
            :class="getClassListInput()"
            :disabled="disabled"
            v-bind="$attrs"
            ref="inputRef"
            v-maska="bindedObject"
            :data-maska="getMaskPattern()"
            :autocomplete="autocomplete"
        />
        <div v-if="suffix" class="suffix">{{ suffix }}</div>
    </div>
    <bm-error v-if="vuelidate && vuelidate.$errors.length > 0" :errors="vuelidate.$errors" />
</template>

<script>
    import BmFormLabel from '@atoms/forms/labels/FormLabel.vue'
    import BmError from '@atoms/forms/Error.vue'
    import useFields from '@/composables/common/fields/useFields.js'
    import { reactive, ref } from 'vue'

    export default {
        name: 'BmInput',
        components: { BmFormLabel, BmError },
        props: {
            modelValue: {
                type: [String, Number],
                default: ''
            },
            id: {
                type: String,
                required: true
            },
            //placeholder
            placeholder: {
                type: String,
                default: undefined
            },
            // text prefixu
            prefix: {
                type: String,
                default: undefined
            },
            // text suffixu
            suffix: {
                type: String,
                default: undefined
            },
            type: {
                type: String,
                default: 'text'
            },
            labelDirection: {
                type: String,
                default: 'horizontal',
                validator: (value) => {
                    return ['vertical', 'horizontal'].includes(value)
                }
            },
            label: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            },
            //vuelidate object
            vuelidate: {
                type: Object,
                default: null
            },
            //tooltip
            tooltipType: {
                type: [String, Object],
                default: ''
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
                default: true
            },
            class: {
                type: String,
                default: undefined
            },
            upperCased: {
                type: Boolean,
                default: false
            },
            // pokial chcem aby input priamo mutoval state vo vuexe
            // napr (Validation, Personal)..
            mutation: {
                type: String,
                default: ''
            },
            // pri niektorych mutaciach potreujem posielat aj nejaky flag
            mutationFlag: {
                type: [String, Number],
                default: ''
            },
            // ak je input lazy, tak jeho hodnota sa zrkadli a� po blure
            // t�m padom je adekvatny model v�dy upadtnut� a� po blure
            lazy: {
                type: Boolean,
                default: true
            },
            // ak je input maskovany, treba mu nadefinovat typ
            maskaType: {
                type: String, //tel, psc, ecv
                default: null,
                validator: (value) => {
                    return ['tel'].includes(value)
                }
            },
            //browser specific vec, vypnutie automatickeho doplnania prehliadacom (funguje na chrome)
            autocomplete: {
                type: String,
                default: ''
            },
            tooltipIcon: {
                type: String,
                default: 'circle-question'
            }
        },
        emits: ['update:modelValue'],
        setup(props, { emit }) {
            const { updateStore } = useFields()

            const inputRef = ref(null)
            const getClassListInput = () => {
                const list = ['bm-input']
                if (props.placeholder !== undefined) list.push('bm-input-placeholder')
                if (
                    props.vuelidate &&
                    props.vuelidate.$errors.length === 0 &&
                    props.vuelidate.$dirty
                )
                    list.push('bm-input-valid')
                if (props.prefix !== undefined) list.push('bm-input-prefix')
                if (props.suffix !== undefined) list.push('bm-input-suffix')
                if (props.class !== undefined) list.push(props.class)
                if (props.upperCased) list.push('bm-input-uppercased')

                return list.join(' ')
            }

            const getClassListWrapper = () => {
                const list = ['bm-input-wrapper']
                if (props.vuelidate && props.vuelidate.$errors.length > 0)
                    list.push('bm-input-wrapper-error')
                if (props.disabled) list.push('bm-input-disabled')

                return list.join(' ')
            }

            const handleInput = (event) => {
                !props.lazy ? updateValue(event.target.value) : ''
            }

            const handleBlur = (event) => {
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

            // posuva do modelu rodica alebo mutujem state vo vuexe
            const updateValue = (value) => {
                if (props.mutation === '') {
                    emit('update:modelValue', props.maskaType ? bindedObject.unmasked : value)
                } else {
                    const payload = {
                        value: props.maskaType ? bindedObject.unmasked : value,
                        flag: props.mutationFlag
                    }
                    updateStore(props.mutation, payload)
                }
            }

            const getMaskPattern = () => {
                if (props.maskaType) {
                    if (props.maskaType === 'tel') return '### ### ###'
                }
                return ''
            }

            const bindedObject = reactive({})

            return {
                inputRef,
                getClassListWrapper,
                getClassListInput,
                handleInput,
                handleFocus,
                handleBlur,
                updateValue,
                getMaskPattern,
                bindedObject
            }
        }
    }
</script>

<style scoped lang="scss">
    //kedze label je atom, definujem odsadenie odspodu
    .bm-label {
        margin-bottom: 8px;
    }
    .bm-input-wrapper {
        display: flex;
        align-items: center;
        border: 1px solid $c-black-50;
        border-radius: $br-semi-small;
        font-size: 16px;
        line-height: 24px;
        font-family: $f-primary;
        background: $c-white-500;
        width: 100%;
        transition: $trans-primary;

        &:focus-within,
        &:focus {
            transition: $trans-primary;
            border-color: $c-purple-300;
            outline: 1px solid $c-purple-300;
        }

        &:hover {
            transition: $trans-primary;
            border-color: $c-purple-300;
        }

        &-error {
            border-color: $c-red-500;
        }

        .prefix,
        .suffix {
            position: relative;
            &:after {
                content: '';
                position: absolute;
                background: $c-gray-400;
                width: 1px;
                height: 100%;
            }
        }

        .prefix {
            padding-left: 16px;
            padding-right: 10px;
            &:after {
                right: 0;
            }
        }

        .suffix {
            padding-right: 16px;
            padding-left: 10px;
            white-space: nowrap;
            &:after {
                left: 0;
            }
        }

        .bm-input {
            border: none;
            font-size: inherit;
            font-family: inherit;
            line-height: inherit;
            border-radius: $br-medium;
            width: 100%;
            padding: 8px 16px;
            background: transparent;

            &:focus {
                outline: none;
            }

            &-prefix {
                padding-left: 10px;
            }
            &-suffix {
                padding-right: 10px;
            }

            &-valid {
                background-image: svg-uri-icon($i-check, #2dc242, null);
                background-size: 12px 12px;
                background-repeat: no-repeat;
                background-position: right 10px top 13px;
                padding-right: 26px;
            }

            &-placeholder {
                &::placeholder {
                    color: $c-gray-400;
                }
            }
            &-uppercased {
                text-transform: uppercase;
            }
        }
        &.bm-input-disabled {
            border: 1px solid $c-gray-400;
            background: $c-gray-300;
            input {
                border: none;
                background: $c-gray-300;
            }
        }
    }
</style>
