<template>
    <bm-box v-if="label.length > 0" display="flex">
        <bm-label
            :label="label"
            :label-optional="labelOptional"
            :id="id"
            :direction="labelDirection"
        />
    </bm-box>

    <div :class="getClassListWrapper()">
        <Multiselect
            :value="modelValue"
            :options="optionsList"
            @select="updateValue"
            @change="handleChange"
            :can-clear="canClear"
            :open-direction="openDirection"
            @open="checkOpenDirection"
            @close="closeSelectEvent"
            no-results-text="Ziadne vysledky"
            no-options-text="Ziadne moznosti"
            ref="multiselectRef"
            v-bind="$attrs"
            :label="optionLabel"
            :value-prop="valueProp"
            :searchable="isSearchable(optionsList)"
        ></Multiselect>
        <bm-progress-circular variant="white" v-if="loading" />
    </div>
    <bm-error v-if="vuelidate && vuelidate.$errors.length > 0" :errors="vuelidate.$errors" />
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmLabel from '@atoms/forms/labels/FormLabel.vue'
    import BmError from '@atoms/forms/Error.vue'
    import Multiselect from '@vueform/multiselect'
    import { ref } from 'vue'
    import useFields from '@/composables/common/fields/useFields'
    import BmProgressCircular from '@atoms/ProgressCircular.vue'
    export default {
        name: 'BmSelect',
        components: { BmProgressCircular, BmError, BmLabel, BmBox, Multiselect },
        props: {
            //label props
            id: {
                type: String,
                required: true
            },
            label: {
                type: String,
                default: ''
            },
            labelDirection: {
                type: String,
                default: 'horizontal',
                validator: (value) => {
                    return ['vertical', 'horizontal'].includes(value)
                }
            },
            labelOptional: {
                type: String,
                default: ''
            },

            //select props
            modelValue: {
                type: [String, Object, Number],
                default: ''
            },
            //ciselnik moznosti
            optionsList: {
                type: Array,
                required: true,
                default: () => []
            },
            //moznost mazat hodnotu selectu cez ikonku x
            canClear: {
                type: Boolean,
                default: false
            },
            error: {
                // toto tu asi nebude neviem ako sa dohodneme
                type: Boolean,
                default: false
            },
            //vuelidate object
            vuelidate: {
                type: Object,
                default: null
            },
            //is valid display
            valid: {
                type: Boolean,
                default: null
            },
            //resetne vuelidate object na focus inputu - aby tam nesvietil error
            resetOnFocus: {
                type: Boolean,
                default: true
            },
            // nastavim kniznici, aky atribut ma pouzit ako label
            optionLabel: {
                type: String,
                default: 'label'
            },
            // nastavim kniznici, aky atribut ma pouzit ako value
            valueProp: {
                type: String,
                default: 'value'
            },
            // pokia� chcem aby input priamo mutoval state vo vuexe
            // napr (Validation, Personal)..
            mutation: {
                type: String,
                default: ''
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        emits: ['update:modelValue'],
        setup(props, { emit }) {
            const isOpen = ref(false)

            const getClassListWrapper = () => {
                const list = ['bm-select']
                if (props.vuelidate && props.vuelidate.$errors.length > 0)
                    list.push('bm-select-wrapper-error')
                if (props.loading) list.push('bm-select-wrapper-loading')

                return list.join(' ')
            }

            const handleChange = () => {
                if (props.resetOnFocus && props.vuelidate) {
                    props.vuelidate.$reset()
                }
            }

            const { updateStore } = useFields()
            // posuva do modelu rodica alebo mutujem state vo vuexe
            const updateValue = (value) => {
                if (props.mutation === '') {
                    emit('update:modelValue', value)
                } else {
                    const payload = {
                        value: value
                    }
                    updateStore(props.mutation, payload)
                }
            }

            /**
             * na open event zistime ci sa dropdown zmesti do viewportu, ak nie,
             * tak mu do openDirection nastavim top, ak sa zmesti, tak bottom
             */
            const openDirection = ref('bottom')
            const multiselectRef = ref(null)
            const checkOpenDirection = () => {
                isOpen.value = true
                const selectElement =
                    multiselectRef.value.$el.querySelector('.multiselect-dropdown')
                const selectBottom = selectElement.getBoundingClientRect().bottom
                const viewportHeight = window.innerHeight

                if (selectBottom > viewportHeight) {
                    openDirection.value = 'top'
                } else {
                    openDirection.value = 'bottom'
                }
            }

            const closeSelectEvent = () => {
                isOpen.value = false
            }

            const closeSelect = () => {
                if (!isOpen.value) {
                    multiselectRef.value.close()
                }
            }

            const isSearchable = () => {
                return true
            }

            return {
                getClassListWrapper,
                handleChange,
                updateValue,
                openDirection,
                checkOpenDirection,
                multiselectRef,
                closeSelect,
                closeSelectEvent,
                isOpen,
                isSearchable
            }
        }
    }
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped lang="scss">
    .u-select {
        position: relative;
        .multiselect {
            &.is-active {
                .u-select__arrow {
                    .u-icon {
                        transform: rotate(180deg);
                    }
                }
            }
        }
        &__arrow {
            z-index: 1;
            padding: 0px 18px 0px 18px;
            display: flex;
            height: 40px;
            align-items: center;
            justify-content: center;
            .u-icon {
                transition: $trans-basic;
            }
        }
        &-wrapper-error {
            .multiselect {
                border-color: $c-red-500;
            }
        }

        &:deep(.u-progress-circular) {
            position: absolute;
            width: 16px;
            height: 16px;
            border: 2px solid #f3f4f6;
            border-top-color: $c-gray-500;
            top: calc(50% - 8px);
            left: 16px;
        }
    }
    .u-label {
        margin-bottom: 8px;
    }
    .u-error {
        margin-top: 8px;
    }
</style>
<style lang="scss">
    .bm-select {
        * {
            font-family: $f-primary;
        }
        .multiselect {
            border: 1px solid $c-black-50;
            border-radius: $br-semi-small;
            &-wrapper {
                min-height: 40px;
                input {
                    border-radius: $br-semi-small;
                }
            }
            .multiselect-search {
                padding-right: 45px;
            }
            &-dropdown {
                max-height: 342px;
                border-radius: $br-semi-small;
                border: 1px solid $c-gray-50;
                .multiselect-group-label {
                    color: $c-red-500;
                    background: transparent;
                    font-weight: 400;
                }
                &.is-hidden {
                    display: block;
                    visibility: hidden;
                    opacity: 0;
                }
                visibility: visible;
                opacity: 1;
            }
            &-caret {
                background: transparent;
                width: 16px;
                -webkit-mask-image: none;
                mask-image: none;
                background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0LjUxODcgNi41NDA2M0w4LjU0Njg0IDEyLjI2MjVDOC4zNDY4NSAxMi40MzEzIDguMTU5MzUgMTIuNSA3Ljk5OTk3IDEyLjVDNy44NDA2IDEyLjUgNy42MjU5MSAxMi40MzA3IDcuNDgxNTMgMTIuMjkxTDEuNDgxNTQgNi41NDA2M0MxLjE4MTY3IDYuMjU2MjUgMS4xNzE5MiA1Ljc1MzEzIDEuNDU5MDQgNS40ODEyNUMxLjc0NDIgNS4xODA0NyAyLjIyMDkxIDUuMTcwNjkgMi41MTg3MyA1LjQ1ODc5TDcuOTk5OTcgMTAuNzEyNUwxMy40ODEyIDUuNDYyNUMxMy43NzgxIDUuMTc0NDEgMTQuMjU1NiA1LjE4NDE5IDE0LjU0MDkgNS40ODQ5NkMxNC44MjgxIDUuNzUzMTMgMTQuODE4NyA2LjI1NjI1IDE0LjUxODcgNi41NDA2M1oiIGZpbGw9IiMxQjFCMUIiLz4KPC9zdmc+Cg==');
                height: 40px;
                background-repeat: no-repeat;
                background-position: center;
                margin-right: 0;
                padding-right: 50px;
            }

            &-placeholder {
                color: $c-gray-300;
            }

            &.is-active {
                box-shadow: none;
                border-color: $c-purple-300;
                outline: 1px solid $c-purple-300;
                .multiselect-search + .multiselect-single-label {
                    color: $c-black-500;
                }
            }

            .multiselect-option {
                color: $c-black-500;
                &.is-selected {
                    background: $c-purple-50;
                    color: $c-black-500;
                }
            }
            .multiselect-group-options {
                li.multiselect-option:last-child {
                    margin-bottom: 20px;
                }
            }
            .multiselect-group:last-child {
                .multiselect-group-options {
                    li.multiselect-option:last-child {
                        margin-bottom: 0px;
                    }
                }
            }
        }
    }
</style>
