<template>
    <div :class="getClassList()">
        <bm-form-label :id="id" :label="label" :description="description" v-if="label" />
        <div class="bm-radiobox-group-items">
            <bm-radiobox
                v-for="(item, index) in data.data"
                :key="index"
                :id="data.config && data.config.id ? data.config.id + index : item.id"
                :name="data.config && data.config.name ? data.config.name : item.name"
                :label="item.label"
                @update:model-value="handleUpdateValue"
                :model-value="modelValue"
                :label-optional="item.labelOptional"
                :value="item.value"
                :label-direction="
                    data.config && data.config.labelDirection
                        ? data.config.labelDirection
                        : item.labelDirection
                "
                :label-second="item.labelSecond"
                :icon="data.config && data.config.icon ? data.config.icon : item.icon"
                :icon-size="
                    data.config && data.config.iconSize ? data.config.iconSize : item.iconSize
                "
                :disabled="item.disabled"
                :tooltip-title="item.tooltipTitle"
                :tooltip-content="item.tooltipContent"
                :bordered="
                    data.config && data.config.bordered ? data.config.bordered : item.bordered
                "
                :width="radioboxWidth"
            >
                <!--              je mozne pridat second label cez slot-->
                <!--              slot sa pridava dynamicky + index (<template #labelSecondSlot1>)-->
                <!--              vid pouzitie v component views-->
                <template #labelSecond>
                    <slot :name="`labelSecondSlot` + (index + 1)" />
                </template>
            </bm-radiobox>
        </div>
        <bm-error v-if="error" error-message="Error text" />
    </div>
</template>

<script>
    import BmFormLabel from '@atoms/forms/labels/FormLabel.vue'
    import BmError from '@atoms/forms/Error.vue'
    import BmRadiobox from '@atoms/forms/Radiobox.vue'
    import useFields from '@/composables/common/fields/useFields.js'

    export default {
        name: 'BmRadioboxGroup',
        components: { BmRadiobox, BmError, BmFormLabel },
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
            //smer zobrazenia grupy
            direction: {
                type: String,
                default: 'vertical',
                validator: (value) => ['horizontal', 'vertical'].includes(value)
            },
            //text labelu
            label: {
                type: String,
                default: ''
            },
            //text popisu
            description: {
                type: String,
                default: ''
            },
            //definujem width pre radio
            radioboxWidth: {
                type: String,
                default: 'fit-content',
                validator: (value) => ['full', 'fit-content'].includes(value)
            },
            //TODO kvoli stylovaniu error stavu
            error: {
                type: Boolean,
                default: false
            },
            //defaultne ked pouzivam v-model
            modelValue: {
                type: [String, Object, Number, Boolean],
                default: null
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
                let list = ['bm-radiobox-group']
                if (props.direction) list.push(`bm-radiobox-group__${props.direction}`)
                if (props.error) list.push(`bm-radiobox-group__error`)
                return `${list.join(' ')}`
            }

            const handleUpdateValue = (pData) => {
                if (props.mutation === '') {
                    emit('update:modelValue', pData)
                } else {
                    const payload = {
                        value: pData
                    }
                    updateStore(props.mutation, payload)
                }
            }

            return {
                getClassList,
                handleUpdateValue
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-radiobox-group {
        & > :deep(.bm-label) {
            display: block;
            margin-bottom: 8px;
        }
        &:deep(.bm-radiobox) {
            .bm-label {
                width: 100%;
            }
        }

        &__horizontal {
            .bm-radiobox-group-items {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                &:deep(.bm-radiobox) {
                    margin: 0 8px 8px 0;
                    &:last-child {
                        margin: 0 0 8px 0;
                    }
                }
            }
        }
        &__vertical {
            .bm-radiobox-group-items {
                display: flex;
                flex-direction: column;
                &:deep(.bm-radiobox) {
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
