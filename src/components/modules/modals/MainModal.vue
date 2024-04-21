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
            <div :class="computedBgColor()">
                <div class="bm-dialog-header">
                    <bm-block-header
                        :title="computedTitle()"
                        :title-icon="icon ? icon : 'circle-info'"
                        :action-click="close"
                        action-icon="error"
                    />
                </div>
                <div class="bm-dialog-content" ref="dialogContent">
                    <bm-dialog-content
                        :type="type.type"
                        :custom-text="text"
                        class="main-modal__dialog-content"
                    />
                </div>
                <div class="bm-dialog-footer">
                    <bm-dialog-footer v-if="customFooter" :type="type" @close="handleClose" />
                    <bm-button
                        v-else
                        icon="like"
                        @click="handleClose"
                        variant="contained"
                        color="green"
                    >
                        Rozumiem
                    </bm-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { ref, nextTick, inject } from 'vue'
    import BmButton from '@atoms/Button.vue'
    import BmBlockHeader from '@atoms/BlockHeader.vue'
    import { useRouter } from 'vue-router'
    import BmDialogContent from '@modules/modals/mainModalContent/MainModalContent.vue'
    import BmDialogFooter from '@modules/modals/mainModalFooter/MainModalFooter.vue'
    import useTranslation from '@/composables/common/translations/useTranslation'

    export default {
        name: 'MainModal',
        components: {
            BmDialogFooter,
            BmDialogContent,
            BmBlockHeader,
            BmButton
        },
        setup() {
            const isOpen = ref(false)
            const isOpenClick = ref(false)
            const dialogContent = ref(null)
            const isScrollableContent = ref(false)
            const emitter = inject('emitter') // Inject `emitter`
            const { translate } = useTranslation()

            const type = ref('')
            const title = ref('')
            const text = ref('')
            const icon = ref('')
            const customFooter = ref(false)
            const router = useRouter()

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
                if (!isOpenClick.value) isOpenClick.value = true
                document.querySelector('body').classList.add('bm-dialog-opened')

                // Wait for the next tick to ensure dialogContent is available
                nextTick(() => {
                    if (dialogContent.value) {
                        isScrollableContent.value =
                            dialogContent.value.scrollHeight > dialogContent.value.clientHeight
                    }
                })
            }

            const close = () => {
                document.querySelector('body').classList.remove('bm-dialog-opened')
                document.removeEventListener('click', handleOutsideClick)

                if (type.value === 'expiredTimer') {
                    router.go(-1)
                }
                type.value = ''
                icon.value = ''
                customFooter.value = false
                text.value = ''
                title.value = ''
                isOpen.value = false
            }

            emitter.on('open-modal', (tooltipType) => {
                // ak je type string, tak ho nalievam do template do prekladoveho kluca a vypisujem texty
                if (typeof tooltipType === 'string') {
                    type.value = tooltipType
                }
                // ak je objekt, tak si title a content vyskladavam z objektu
                //     type: custom je povinny ak vyskladavam tooltip (z BE napriklad)
                // no mozem to pouzit aj ako {type: 'contractStartDate', icon: 'circle-waning', customFooter: true} ak chcem customizovat tooltip
                //ak mam customFooter: true a pre dany typ nemam pripraveny template, tak nezobrazim footer.
                // priklad: callCenter ma custom footer, takze ak dam type callCenter a customFooter true, tak zobrazujem footer
                else if (typeof tooltipType === 'object') {
                    type.value = tooltipType.type
                    icon.value = tooltipType.icon
                    customFooter.value = tooltipType.customFooter
                    text.value = tooltipType.text
                    title.value = tooltipType.title
                }
                open()
            })

            const computedTitle = () => {
                // ak je type custom, tak vraciam title, inak prekladovy kluc
                if (type.value === 'custom' || type.value === 'custom-html') {
                    return title.value
                } else {
                    return translate('nrsr-hlasovanie.modal.' + type.value.type + '_title')
                }
            }

            const computedBgColor = () => {
                if (type.value === 'summaryGlobal') {
                    return 'bm-dialog bm-dialog__blue-light-bg'
                } else {
                    return 'bm-dialog bm-dialog__white-bg'
                }
            }

            return {
                isOpen,
                open,
                close,
                handleClose,
                type,
                icon,
                customFooter,
                text,
                title,
                computedTitle,
                computedBgColor,
                dialogContent,
                isScrollableContent
            }
        }
    }
</script>

<style scoped lang="scss">
    //vidalogu zobrazujeme offer card z ponuky zo step 1. Potrebujem ju upravit ak je v modale
    .bm-dialog {
        .bm-dialog-content {
            .payment-frequency-wrapper {
                display: none;

                & + .bm-form-wrapper {
                    margin-top: 0;
                }
            }
        }
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
            background-color: rgba(0, 0, 0, 0.8);
            width: 100%;
            height: 100%;
            transition: $trans-basic;
        }

        //ak je scrollovatelny, pridavam tiene an header a footer
        &.bm-dialog-is-scrollable {
            .bm-dialog {
                &-header {
                    box-shadow: $bs-modern-soft;
                }

                &-footer {
                    box-shadow: 0px -2px 12px rgba(27, 27, 27, 0.2);
                }
            }
        }
    }

    .bm-dialog {
        background-color: $c-white-500;
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

            &:deep(.card-is-sticky) {
                //ked je sticky karta v modale, nechceme aby bola sticky. Rozbija dizajn
                position: relative;
                top: 0;
            }

            @media (min-width: $bp-mobile) {
                padding: 16px 32px;
            }
        }

        &-footer {
            position: relative;
            padding: 16px;
            display: flex;
            justify-content: flex-start;
            width: 100%;
            z-index: 2;
            @media (min-width: $bp-mobile) {
                max-height: unset;
                width: 100%;
                bottom: 0;
                left: 0;
                box-shadow: none;
                justify-content: flex-end;
                padding: 24px 32px 32px;
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
                background: $c-blue-50;
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
