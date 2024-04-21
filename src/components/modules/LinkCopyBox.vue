<template>
    <bm-box class="link-copy-wrapper">
        <bm-typography component="p" class="code-box">
            {{ companyInviteLink }}
        </bm-typography>
        <bm-box class="icon-box" @click="handleCopyToClipboard">
            <bm-icon icon="copy" size="18" />
        </bm-box>
    </bm-box>
    <bm-alert-message :text="copyMsg.message" :variant="copyMsg.variant" />
</template>

<script>
    import BmTypography from '@atoms/Typography.vue'
    import { useStore } from 'vuex'
    import { computed, ref } from 'vue'
    import BmAlertMessage from '@atoms/AlertMessage.vue'
    import BmBox from '@/components/layout/Box.vue'
    import BmIcon from '@atoms/Icon.vue'

    export default {
        name: 'LinkCopyBox',
        components: { BmIcon, BmBox, BmAlertMessage, BmTypography },
        props: {
            link: {
                type: String,
                required: true
            }
        },
        setup() {
            const store = useStore()
            const companyInviteLink = computed(() => store.getters['company/getCompanyInviteLink'])
            const copied = ref(false)
            const copyMsg = computed(() => store.getters['config/getAlertMessage'])

            const handleCopyToClipboard = () => {
                navigator.clipboard.writeText(companyInviteLink.value)
                copied.value = true
                store.dispatch('config/setAlertMessage', {
                    message: 'Copied to clipboard',
                    type: 'success'
                })

                // Reset 'copied' to false after 1 second
                setTimeout(() => {
                    copied.value = false
                }, 1000)
            }

            return {
                companyInviteLink,
                handleCopyToClipboard,
                copied,
                copyMsg
            }
        }
    }
</script>

<style lang="scss" scoped>
    .code-box {
    }
    .link-copy-wrapper {
        margin-bottom: 16px;
        background: $c-gray-50;
        border-radius: $br-semi-small;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .code-box {
            overflow-x: auto;
            padding: 16px;
        }
        .icon-box {
            background: $c-cyan-dark-400;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 12px;
            top: 0;
            right: 0;
            cursor: pointer;
            bottom: 0;
            &:hover {
                &:deep(.bm-icon) {
                    transition: $trans-primary;
                    transform: translateY(-2px);
                }
            }
            &:active {
                background: $c-cyan-dark-300;
            }
            &:deep(.bm-icon) {
                transition: $trans-primary;
                display: flex;
                svg {
                    path {
                        fill: $c-white-500;
                    }
                }
            }
        }
    }
</style>
