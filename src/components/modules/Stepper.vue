<template>
    <bm-box pt="16" pb="16">
        <div :class="getClassList()" v-if="!isLastStep">
            <div
                v-for="(item, index) in computedSteps"
                :key="item.key"
                :class="returnStepStatus(index)"
                class="bm-stepper__item"
                @click="goToStep(index)"
                :style="{ background: backgroundColor }"
            >
                <Transition name="bounce">
                    <bm-icon
                        v-if="returnStepStatus(index) === 'done'"
                        :size="14"
                        icon="success"
                        color="#03B675"
                    />
                </Transition>
                {{ item.title }}
            </div>
        </div>
        <div :class="getClassList(isLastStep)" v-else>
            <div class="bm-stepper__item">
                <bm-icon :size="14" icon="success" color="#03B675" />
                {{ lastStepObj.title }}
            </div>
        </div>
    </bm-box>
</template>

<script>
    import BmIcon from '@atoms/Icon.vue'
    import { ref, computed } from 'vue'
    import useStep from '@/composables/common/stepping/useStep.js'
    import { useStore } from 'vuex'
    import BmBox from '@/components/layout/Box.vue'
    export default {
        name: 'BmStepper',
        components: { BmBox, BmIcon },
        props: {
            variant: {
                type: String,
                default: 'mobile'
            },
            actualStep: {
                type: Number,
                default: 0
            },
            backgroundColor: {
                type: String,
                default: ''
            }
        },
        setup(props) {
            const { setStep } = useStep()
            const store = useStore()
            const steps = computed(() => store.getters['stepping/getSteps'])

            /**
             * nastavime classy pre stepper podla varianty a ci je posledny krok
             */
            const getClassList = (isLastStep) => {
                let list = ['bm-stepper']
                if (props.variant) {
                    list.push(`bm-stepper-${props.variant}`)
                } else {
                    list.push(`bm-stepper-mobile`)
                }
                if (isLastStep) {
                    list.push('bm-stepper--last-step')
                }
                return list
            }

            /**
             * zistime ci je krok aktivny, dokonceny alebo neaktivny
             */
            const returnStepStatus = (index) => {
                if (index === props.actualStep) {
                    return 'active'
                } else if (index < props.actualStep) {
                    return 'done'
                } else {
                    return ''
                }
            }

            /**
             * prejdeme na dany krok, toto je TODO, zatial len alert
             */
            const goToStep = (index) => {
                if (index < props.actualStep) {
                    setStep(index)
                }
            }

            /**
             * vytvorime si kopiu steps, z ktorej odstranime posledny krok
             */
            const stepsCopy = ref([...steps.value])
            const computedSteps = computed(() => {
                const copy = [...stepsCopy.value]
                copy.pop()
                return copy
            })

            /**
             * zistime ci je posledny krok
             */
            const isLastStep = computed(() => {
                return props.actualStep === steps.value.length
            })

            /**
             * vytvorime si objekt posledneho kroku
             */
            const lastStepObj = computed(() => {
                return steps.value[steps.value.length]
            })

            return {
                getClassList,
                returnStepStatus,
                goToStep,
                computedSteps,
                isLastStep,
                lastStepObj,
                steps
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-stepper {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        list-style: none;
        padding: 0;
        justify-content: space-between;
        max-width: 375px;
        margin: 0 auto;
        position: relative;
        &__item {
            font-size: 14px;
            color: $c-gray-400;
            font-family: $f-primary;
            padding: 8px 10px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            &:deep(.bm-icon) {
                line-height: 0;
                svg {
                    margin-right: 4px;
                    transition: all 0.2s ease;
                }
            }
            &.done {
                cursor: pointer;
                color: $c-green-500;
            }
            &.active {
                color: $c-yellow-500;
            }
        }
        &--last-step {
            &:before {
                display: none;
            }
            .bm-stepper__item {
                width: 100%;
            }
        }
        &-mobile {
            //&:before {
            //  content: '';
            //  height: 1px;
            //  background: $c-gray-400;
            //  width: 100%;
            //  left: 0;
            //  right: 0;
            //  top: 50%;
            //  position: absolute;
            //}
        }
        .bounce-enter-active {
            animation: bounce-in 0.3s;
        }
        .bounce-leave-active {
            animation: bounce-in 0.2s reverse;
        }
        @keyframes bounce-in {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.25);
            }
            100% {
                transform: scale(1);
            }
        }
    }
</style>
