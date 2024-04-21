<template>
    <bm-box :class="getClassList" v-if="isOpen">
        {{ textRef }}
        <bm-icon icon="xmark" size="16" @click="closeAlert" />
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmIcon from '@atoms/Icon.vue'
    import { ref, watch } from 'vue'
    import { useStore } from 'vuex'

    export default {
        name: 'BmAlertMessage',
        components: { BmIcon, BmBox },
        props: {
            text: {
                type: String,
                default: ''
            },
            variant: {
                type: String,
                default: 'success'
            }
        },
        setup(props) {
            const isOpen = ref(false)
            const store = useStore()
            const textRef = ref('') // Initialize textRef

            const closeAlert = () => {
                isOpen.value = false
                store.commit('config/SET_ALERT_MESSAGE', { message: null, variant: null })
            }

            const getClassList = ref(['bm-alert'])

            // Watch the `text` prop for changes
            watch(
                () => props.text,
                (newText) => {
                    textRef.value = newText
                    if (newText) {
                        isOpen.value = true
                        setTimeout(() => {
                            isOpen.value = false
                            store.commit('config/SET_ALERT_MESSAGE', {
                                message: null,
                                variant: null
                            })
                        }, 3000)
                    }
                }
            )

            watch(isOpen, (newValue) => {
                getClassList.value = ['bm-alert']
                if (props.variant) {
                    getClassList.value.push(`bm-alert-${props.variant}`)
                }
                if (newValue) {
                    getClassList.value.push('bm-alert-show')
                } else {
                    getClassList.value.push('bm-alert-hide')
                }
            })

            return { getClassList, textRef, closeAlert, isOpen }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-alert {
        position: fixed;
        width: 300px;
        bottom: 0;
        padding: 16px;
        border-radius: $br-medium;
        box-shadow: $bs-primary;
        font-size: 1rem;
        left: calc(50% - 150px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        transform: translateY(-50%);
        transition: $trans-basic;
        &-show {
            animation: slideUp 0.3s ease-in-out;
            transition: $trans-basic;
        }
        &-hide {
            animation: slideUp 0.3s ease-in-out reverse;
            transition: $trans-basic;
        }
        &-success {
            background-color: $c-green-400;
            color: $c-white-500;
        }
        &-error {
            background-color: $c-red-400;
            color: $c-white-500;
        }
        &-warning {
            background-color: $c-yellow-400;
            color: $c-white-500;
        }
        &-info {
            background-color: $c-blue-200;
            color: $c-white-500;
        }
        &:deep(.bm-icon) {
            cursor: pointer;
            display: flex;
            svg {
                width: 20px;
                height: 20px;
                path {
                    fill: $c-white-500;
                }
            }
        }
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(100%);
        }
        to {
            opacity: 1;
            transform: translateY(-50%);
        }
    }
</style>
