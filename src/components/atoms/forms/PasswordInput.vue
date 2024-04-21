<template>
    <bm-box class="password-wrapper">
        <bm-input :label="label" :v-model="modelValue" :id="id" :type="inputType" />
        <!--        <bm-icon :icon='eyeIcon' :size='20' @click='togglePassword' />-->
    </bm-box>
</template>

<script>
    import BmInput from '@atoms/forms/Input.vue'
    import BmBox from '@/components/layout/Box.vue'

    export default {
        name: 'BmPasswordInput',
        components: { BmBox, BmInput },
        props: {
            id: {
                type: [Number, String],
                required: true
            },
            label: {
                type: String,
                default: ''
            },
            modelValue: {
                type: String,
                default: ''
            }
        },
        setup() {
            let showPassword = false
            let inputType = 'password'
            let eyeIcon = 'eye'

            const togglePassword = () => {
                showPassword = !showPassword
                inputType = showPassword ? 'text' : 'password'
                eyeIcon = showPassword ? 'eye-slash' : 'eye'

                // Reset back to original state after 3 seconds
                setTimeout(() => {
                    showPassword = false
                    inputType = 'password'
                    eyeIcon = 'eye'
                }, 3000)
            }

            return {
                inputType,
                eyeIcon,
                togglePassword
            }
        }
    }
</script>

<style lang="scss" scoped>
    .password-wrapper {
        position: relative;

        &:deep(svg) {
            cursor: pointer;
            position: absolute;
            right: 10px;
            top: calc(50% - 10px);
        }
    }
</style>
