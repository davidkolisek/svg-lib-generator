<template>
    <div :class="getClassList()">
        <bm-form-label :id="id" :label="label" :description="description" v-if="label" />
        <div class="bm-checkbox-group__items">
            <bm-checkbox
                v-for="(item, index) in data.data"
                :key="index"
                :id="data.config && data.config.id ? data.config.id + index : item.id"
                :name="data.config && data.config.name ? data.config.name + index : item.name"
                :label="item.label"
                @update:model-value="handleUpdateValue"
                :label-optional="item.labelOptional"
                :label-direction="
                    data.config && data.config.labelDirection
                        ? data.config.labelDirection
                        : item.labelDirection
                "
                :tooltip-content="item.tooltipContent"
                :tooltip-title="item.tooltipTitle"
                :bordered="
                    data.config && data.config.bordered ? data.config.bordered : item.bordered
                "
                :disabled="item.disabled"
                :icon="data.config && data.config.icon ? data.config.icon : item.icon"
                :icon-size="
                    data.config && data.config.iconSize ? data.config.iconSize : item.iconSize
                "
                :data-value="item.dataValue"
                :checked="shouldBeChecked(item.dataValue)"
                :width="checkboxWidth"
                :label-second="item.labelSecond"
            >
                <!--              je mozne pridat second label cez slot-->
                <!--              slot sa pridava dynamicky + index (<template #labelSecondSlot1>)-->
                <!--              vid pouzitie v component views-->
                <template #labelSecond>
                    <slot :name="`labelSecondSlot` + (index + 1)" />
                </template>
            </bm-checkbox>
        </div>
        <bm-error v-if="error" error-message="Error text" />
    </div>
</template>

<script>
    import BmFormLabel from '@atoms/forms/labels/FormLabel.vue'
    import BmCheckbox from '@atoms/forms/Checkbox.vue'
    import BmError from '@atoms/forms/Error.vue'
    import useFields from '@/composables/common/fields/useFields.js'

    export default {
        name: 'BmCheckboxGroup',
        components: { BmError, BmCheckbox, BmFormLabel },
        props: {
            id: {
                type: String,
                default: ''
            },
            // objekt typu {data: [], config: {}}
            // * config - genericke spolocne veci
            //* data - hlavne values a labes a ine veci z be
            data: {
                type: Object,
                default: () => {}
            },
            // text labelu
            label: {
                type: String,
                default: ''
            },
            labelSecond: {
                type: String,
                default: ''
            },
            labelSecondSlot: {
                type: String,
                default: ''
            },
            //definujem width pre checkbox
            checkboxWidth: {
                type: String,
                default: 'fit-content',
                validator: (value) => ['full', 'fit-content'].includes(value)
            },
            // text popisu
            description: {
                type: String,
                default: ''
            },
            // smer checkboxov grupy
            direction: {
                type: String,
                default: 'vertical',
                validator: (value) => ['horizontal', 'vertical'].includes(value)
            },
            error: {
                type: Boolean,
                default: false
            },
            //defaultne ked pouzivam v model
            modelValue: {
                type: Array,
                default: () => []
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
        setup(props, { emit }) {
            const { updateStore } = useFields()
            const getClassList = () => {
                let list = ['bm-checkbox-group']
                if (props.error) {
                    list.push(`bm-checkbox-group__error`)
                }
                if (props.direction) {
                    if (props.direction) list.push(`bm-checkbox-group__${props.direction}`)
                }
                return `${list.join(' ')}`
            }

            const handleUpdateValue = (pData) => {
                let newData = props.modelValue
                // Check if an object with the same ID already exists
                const existingObjectIndex = newData.findIndex((obj) => obj.id === pData.id)

                if (existingObjectIndex !== -1) {
                    // If an existing object is found, remove it from the array
                    newData.splice(existingObjectIndex, 1)
                } else {
                    // If no existing object is found, add the new object to the array
                    newData.push(pData)
                }

                if (props.mutation === '') {
                    emit('update:modelValue', newData)
                } else {
                    const payload = {
                        value: newData
                    }
                    updateStore(props.mutation, payload)
                }
            }

            const shouldBeChecked = (dataValue) => {
                return props.modelValue.includes(dataValue)
            }

            return {
                shouldBeChecked,
                handleUpdateValue,
                getClassList
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-checkbox-group {
        & > :deep(.bm-label) {
            margin-bottom: 8px;
            display: block;
        }
        &__horizontal {
            .bm-checkbox-group__items {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                &:deep(.bm-checkbox) {
                    margin: 0 8px 8px 0;
                    &:last-child {
                        margin: 0 0 8px 0;
                    }
                }
            }
        }
        &__vertical {
            .bm-checkbox-group__items {
                display: flex;
                flex-direction: column;
                &:deep(.bm-checkbox) {
                    margin: 0 0 8px 0;
                    &:last-child {
                        margin: 0;
                    }
                }
            }
            :deep(.bm-error) {
                margin-top: 8px;
            }
        }
    }
</style>
