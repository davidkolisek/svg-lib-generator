<!--Použitá knižnica-->

<!--https://vue3datepicker.com/props/modes/-->

<template>
    <bm-form-label
        :direction="labelDirection"
        :id="id"
        :label="label"
        :description="labelDescription"
        :tooltip-type="tooltipType"
    />
    <VueDatePicker
        ref="datepicker"
        :input-class-name="getClassListInput()"
        :uid="id"
        :format="computedDateFormat"
        :placeholder="placeholder"
        :locale="'sk'"
        :model-value="modelValue"
        @update:model-value="onDateSelected"
        auto-apply
        keep-action-row
        :clearable="false"
        :enable-time-picker="false"
        v-bind="$attrs"
        :action-row="{ showNow: true, showPreview: false, showSelect: false, showCancel: false }"
        :disabled="disabled"
    >
        <template #input-icon>
            <bm-icon icon="calendar" size="16" />
        </template>
        <template #action-buttons>
            <span class="dp__action_buttons" v-if="!isYearPicker">
                <button class="custom-now" @click="selectToday">Dnes</button>
                <button class="custom-month" @click="firstMonth">Prvy mesiac</button>
            </span>
        </template>
    </VueDatePicker>

    <bm-error v-if="vuelidate && vuelidate.$errors.length > 0" :errors="vuelidate.$errors" />
</template>

<script>
    import VueDatePicker from '@vuepic/vue-datepicker'

    import BmFormLabel from '@atoms/forms/labels/FormLabel.vue'
    import BmIcon from '@atoms/Icon.vue'

    import BmError from '@atoms/forms/Error.vue'
    import { computed, ref } from 'vue'
    import useFields from '@/composables/common/fields/useFields.js'

    export default {
        name: 'BmDatepicker',
        components: {
            BmError,
            BmIcon,
            BmFormLabel,
            VueDatePicker
        },
        props: {
            id: {
                type: [String, Number],
                required: true
            },
            label: {
                type: String,
                default: ''
            },
            placeholder: {
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
            labelDescription: {
                type: String,
                default: ''
            },
            tooltipType: {
                type: [String, Object],
                default: ''
            },
            bordered: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
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
            // pri niektorych mutaciach potreujem posielat aj nejaky flag
            mutationFlag: {
                type: [String, Number],
                default: ''
            },

            modelValue: {
                type: [Number, Object, Date, String],
                default: null
            }
        },
        emits: ['update:modelValue', 'change'],

        setup(props, { emit, attrs }) {
            const { updateStore } = useFields()

            const datepicker = ref(null)

            const getClassListInput = () => {
                const list = []
                if (
                    props.vuelidate &&
                    props.vuelidate.$errors.length === 0 &&
                    props.vuelidate.$dirty
                )
                    list.push('dp__input_valid')
                if (props.vuelidate && props.vuelidate.$errors.length > 0)
                    list.push('dp__input_error')

                return list.join(' ')
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
                    //potrebujem emitnut zmenu value, kvoli tomu aby som vedel zavolat searchChanged metodu (odblokovat button)
                    emit('change')
                }
            }

            // kedze kniznica je super a nemeni time tak som musel pridat tento hack, takto priradime k date aj time
            // kedy na vyber datumu navstevnik klikol
            const onDateSelected = (value) => {
                if (value instanceof Date) {
                    const currentTime = new Date()
                    value.setHours(
                        currentTime.getHours(),
                        currentTime.getMinutes(),
                        currentTime.getSeconds()
                    )
                    updateValue(value)
                }
                // ak je year picker, tak neriesime time
                else {
                    updateValue(value)
                }
            }

            const computedDateFormat = computed(() => {
                if (attrs['year-picker'] !== undefined) {
                    return 'yyyy'
                } else {
                    return 'dd.MM.yyyy'
                }
            })

            const isYearPicker = computed(() => {
                return attrs['year-picker'] !== undefined
            })

            const selectToday = () => {
                updateValue(new Date())
                datepicker.value.closeMenu()
            }

            const firstMonth = () => {
                // Get the current date
                const currentDate = new Date()

                // Add one month to the current date
                currentDate.setMonth(0)
                currentDate.setDate(1)

                datepicker.value.updateInternalModelValue(currentDate)
            }

            return {
                onDateSelected,
                getClassListInput,
                computedDateFormat,
                selectToday,
                datepicker,
                isYearPicker,
                firstMonth
            }
        }
    }
</script>

<style scoped lang="scss">
    .bm-label {
        margin-bottom: 8px;
    }

    .bm-error {
        margin-top: 8px;
    }

    :deep(.dp__input) {
        border: 1px solid $c-gray-500;
        font-family: $f-primary;
        height: 42px;
        &:focus-within,
        &:focus {
            border-color: $c-yellow-500;
        }

        &:hover {
            border-color: $c-gray-500;
        }

        &:disabled {
            &:hover {
                border: 1px solid $c-gray-400;
            }
        }
    }

    :deep(.dp__input_icon_pad) {
        padding: var(--dp-input-padding);
    }
    :deep(.dp__input_icon) {
        right: 16px;
        left: unset;
        line-height: 14px;
    }

    :deep(.dp__input_valid) {
        background-image: svg-uri-icon($i-check, $c-green-500, null);
        background-size: 16px 16px;
        background-repeat: no-repeat;
        background-position: right 40px top 10px;
        padding-right: 60px;
    }

    :deep(.dp__input_error) {
        border-color: $c-red-500;
    }
    :deep(.dp__action_buttons) {
        flex: 1;
        gap: 8px;
        button {
            display: inline-block;
            padding: 5px 10px;
            font-size: 12px;
            font-weight: bold;
            text-align: center;
            text-decoration: none;
            border-radius: 4px;
            color: $c-white-500;
            background-color: $c-yellow-500;
            border: none;
            transition: background-color 0.3s ease;
            cursor: pointer;
            &:hover {
                color: red;
            }
        }
    }
</style>
