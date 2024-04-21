<template>
    <transition name="fade">
        <div
            v-if="isOpen"
            class="bm-dialog-overlay"
            :class="{
                'fade-enter': isOpen,
                'fade-leave-to': !isOpen,
                'bm-dialog-is-scrollable': isScrollableContent
            }"
        >
            <div :class="getClassList()">
                <div class="bm-dialog-header">
                    <slot v-if="$slots.header" name="header" />
                </div>
                <div class="bm-dialog-content" ref="dialogContent">
                    <slot v-if="$slots.content" name="content" />
                </div>
                <div v-if="$slots.footer" class="bm-dialog-footer">
                    <slot v-if="$slots.footer" name="footer" />
                    <bm-button icon="like" @click="handleClose" variant="contained" color="green">
                        Ok!
                    </bm-button>
                </div>
                <div v-else class="bm-dialog-footer">
                    <bm-box v-if="$slots.footerBtn1" class="footer-btn-1">
                        <slot name="footerBtn1" />
                    </bm-box>
                    <bm-box v-if="$slots.footerBtn2" class="footer-btn-2">
                        <slot name="footerBtn2" />
                    </bm-box>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { ref, nextTick } from 'vue'
    import BmButton from '@atoms/Button.vue'
    import BmBox from '@/components/layout/Box.vue'

    export default {
        name: 'BmDialog',
        components: { BmBox, BmButton },
        props: {
            title: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: 'circle-info'
            },
            // mame variant s bielym content pozadim a blue-light content pozadim
            variant: {
                type: String,
                default: 'white-bg',
                validator: (value) => {
                    return ['white-bg', 'blue-light-bg'].includes(value)
                }
            },
            openOnClick: {
                type: Boolean,
                default: true
            }
        },
        emits: ['close'],
        setup(props, { emit }) {
            const isOpen = ref(false)
            const isOpenClick = ref(props.openOnClick)
            const dialogContent = ref(null)
            const isScrollableContent = ref(false)

            const handleOutsideClick = (e) => {
                if (!isOpenClick.value) {
                    if (isOpen.value) {
                        if (e.target.closest('.bm-dialog')) return
                        close()
                        document.removeEventListener('click', handleOutsideClick)
                    }
                } else {
                    isOpenClick.value = false
                }
            }

            const handleClose = () => {
                close()
            }

            const open = () => {
                document.addEventListener('click', handleOutsideClick)

                isOpen.value = true
                if (props.openOnClick) isOpenClick.value = true
                document.querySelector('body').classList.add('bm-dialog-opened')

                //po zobrazeni dialogu checkujem ci ma dialog scrollbar alebo nie. Na zaklade toho upravujem styly
                nextTick(() => {
                    isScrollableContent.value =
                        dialogContent.value.scrollHeight > dialogContent.value.clientHeight
                })
            }

            const close = () => {
                document.querySelector('body').classList.remove('bm-dialog-opened')

                document.removeEventListener('click', handleOutsideClick)

                emit('close')
                isOpen.value = false
            }

            const getClassList = () => {
                const list = ['bm-dialog']
                if (props.variant) {
                    list.push(`bm-dialog__${props.variant}`)
                }
                return list.join(' ')
            }

            return {
                isOpen,
                open,
                close,
                handleClose,
                dialogContent,
                isScrollableContent,
                getClassList
            }
        }
    }
</script>

<style lang="scss">
    body.bm-dialog-opened {
        overflow: hidden;
    }
</style>

<style scoped lang="scss">
    .fade-enter-active,
    .fade-leave-active,
    .fade-enter,
    .fade-leave-to {
        transition: $trans-basic;
    }

    .fade-enter {
        &.bm-dialog-overlay {
            &:before {
                animation: fadeIn 0.3s 1;
                @media (min-width: $bp-mobile) {
                    animation: fadeIn 0.3s 1;
                }
            }
            .bm-dialog {
                animation: swipeUp 0.3s 1;
                @media (min-width: $bp-mobile) {
                    animation: fadeIn 0.3s 1;
                }
            }
        }
    }

    .fade-leave-to {
        opacity: 0;
        &.bm-dialog-overlay {
            &:before {
                animation: fadeIn 0.3s 1;
                @media (min-width: $bp-mobile) {
                    animation: fadeIn 0.3s 1;
                }
            }
            .bm-dialog {
                animation: swipeDown 0.3s 1;
                @media (min-width: $bp-mobile) {
                    animation: fadeIn 0.3s 1;
                }
            }
        }
    }

    .bm-dialog-overlay {
        top: 0;
        left: 0;
        position: fixed;
        height: 100%;
        align-items: center;
        justify-content: center;
        width: 100%;
        display: flex;
        z-index: 9999;
        transition: $trans-basic;
        &:before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
            transition: $trans-basic;
        }
        //ak je scrollovatelny, pridavam tiene an header a footer
        &.bm-dialog-is-scrollable {
            .bm-dialog {
                &-header {
                }
                &-footer {
                    box-shadow: 0px -2px 12px rgba(27, 27, 27, 0.2);
                }
            }
        }
    }

    .bm-dialog {
        display: flex;
        max-height: 80%;
        width: 100%;
        margin: 0;
        position: fixed;
        max-width: unset;
        flex-direction: column;
        bottom: 0;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        @media (min-width: $bp-mobile) {
            width: calc(100% - 64px);
            max-width: 600px;
            border-radius: 10px;

            bottom: unset;
        }
        &-header {
            background-color: $c-white-500;
            position: relative;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            z-index: 9999;
            padding: 16px;
            width: 100%;
            :deep(.bm-block-header) {
                border-bottom: none;
                padding-bottom: 0;
            }
            @media (min-width: $bp-mobile) {
                border-radius: 10px 10px 0 0;
                box-shadow: unset;
                padding: 32px 32px 24px;
            }
        }

        &-content {
            padding: 16px;
            overflow-y: auto;
            @media (min-width: $bp-mobile) {
                padding: 16px 32px;
            }
        }

        &-footer {
            position: relative;
            padding: 16px;
            display: flex;
            justify-content: center;
            width: 100%;
            z-index: 2;
            background: $c-white-500;
            border-bottom-left-radius: $br-medium;
            border-bottom-right-radius: $br-medium;
            flex-direction: column;
            @media (min-width: $bp-mobile) {
                max-height: unset;
                width: 100%;
                bottom: 0;
                left: 0;
                box-shadow: none;
                justify-content: flex-end;
                padding: 24px 32px 32px;
                flex-direction: row;
            }
            .footer-btn-1 {
                margin-right: 0;
                margin-bottom: 16px;
                width: 100%;
                @media (min-width: $bp-mobile) {
                    margin-right: 16px;
                    margin-bottom: 0;
                }
            }
            .footer-btn-2 {
                width: 100%;
            }
            &:deep(.bm-btn) {
                .bm-icon {
                    margin-left: 8px;
                    vertical-align: -0.125em;
                    svg {
                        min-width: 16px;
                        min-height: 16px;
                    }
                }
            }
        }
        &__white-bg {
            .bm-dialog-content {
                background: $c-white-500;
            }
        }
        &__blue-light-bg {
            .bm-dialog-content {
                background: orange;
            }
        }
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes swipeUp {
        0% {
            transform: translateY(100%);
        }
        100% {
            transform: translateY(0);
        }
    }

    @keyframes swipeDown {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(100%);
        }
    }
</style>
