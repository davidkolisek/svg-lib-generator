<template>
    <bm-box
        :class="[
            'bm-dropdown-wrapper',
            { 'is-wrapped': isWrapped, 'has-shadow': hasChildBoxShadow }
        ]"
    >
        <bm-box class="bm-dropdown-wrapper__inner">
            <slot />
        </bm-box>
        <bm-box :class="getClassListArrow()">
            <bm-box @click="toggleCollapseWrapper" class="bm-dropdown-wrapper__arrow-btn">
                <bm-icon :size="16" icon="chevron-down" color="#FFF" />
            </bm-box>
        </bm-box>
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmIcon from '@atoms/Icon.vue'
    import { ref, onMounted } from 'vue'

    export default {
        name: 'BmDropdownWrapper',
        components: { BmIcon, BmBox },
        props: {
            //v niektorych pripadoch ma rozbalovacia sipka border, default je false
            hasBorderBottom: {
                type: Boolean,
                default: false
            }
        },
        setup(props) {
            const isWrapped = ref(true)
            const hasChildBoxShadow = ref(false)

            const toggleCollapseWrapper = () => {
                isWrapped.value = !isWrapped.value
            }

            //kedze niektore child elementy pre tento komponent mozu mat box-shadow, tak overflow:hidden ho orezava.
            //pri loade checkujem ci child element ma box-shadow. Ak ano, tak ho zoberiem a pridavam na parent element
            //zaroven checkujem ci je iba 1 child alebo viacero + ci ma/maju margin top/bottom, aby som ho priratal k max-height
            const adjustWrapperStyles = () => {
                // Select all elements with the class 'bm-dropdown-wrapper__inner'
                const dropdownWrappers = document.querySelectorAll('.bm-dropdown-wrapper__inner')

                // Loop through each dropdown wrapper element
                dropdownWrappers.forEach((dropdownWrapper) => {
                    if (dropdownWrapper) {
                        // Get all child elements of the dropdown wrapper
                        const childElements = dropdownWrapper.children
                        let totalHeight = 0

                        // Calculate the total height of the child elements, including margins
                        for (let i = 0; i < childElements.length; i++) {
                            const computedStyle = window.getComputedStyle(childElements[i])
                            const marginTop = parseFloat(
                                computedStyle.getPropertyValue('margin-top')
                            )
                            const marginBottom = parseFloat(
                                computedStyle.getPropertyValue('margin-bottom')
                            )
                            const elementHeight = childElements[i].offsetHeight

                            totalHeight += elementHeight + marginTop + marginBottom
                        }

                        // Set the maxHeight of the dropdown wrapper to the calculated total height
                        dropdownWrapper.style.maxHeight = `${totalHeight}px`
                        dropdownWrapper.style.marginBottom = `16px`

                        // If there is only one child element
                        if (childElements.length === 1) {
                            const firstChild = dropdownWrapper.firstElementChild
                            const computedStyle = window.getComputedStyle(firstChild)
                            const boxShadow = computedStyle.getPropertyValue('box-shadow')
                            dropdownWrapper.style.marginBottom = `0`

                            // If the first child has a box-shadow property, apply it to the dropdown wrapper
                            if (boxShadow) {
                                dropdownWrapper.style.boxShadow = boxShadow
                            }
                        }
                    }
                })
            }

            onMounted(adjustWrapperStyles)

            const getClassListArrow = () => {
                const list = ['bm-dropdown-wrapper__btn-wrapper']
                if (props.hasBorderBottom) list.push(`has-border-bottom`)

                return list.join(' ')
            }

            return { toggleCollapseWrapper, isWrapped, hasChildBoxShadow, getClassListArrow }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-dropdown-wrapper {
        position: relative;
        &:before {
            content: '';
            opacity: 0;
            //transition: $trans-basic;
        }
        &.is-wrapped {
            &:before {
                content: '';
                background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 77.08%);
                top: 20%;
                left: 0;
                right: 0;
                position: absolute;
                bottom: 0;
                //transition: $trans-basic;
                opacity: 1;
            }
            .bm-dropdown-wrapper__inner {
                overflow: hidden;
                max-height: 80px !important;
                //transition: $trans-basic;
            }
            .bm-dropdown-wrapper__arrow-btn {
                &:deep(.bm-icon) {
                    line-height: 0;
                    svg {
                        transform: rotate(0deg);
                    }
                }
            }
        }
        &__inner {
            overflow: hidden;
            //transition: $trans-basic;
        }
        &__btn-wrapper {
            position: relative;
            bottom: 0;
            left: 0;
            right: 0;
            &.has-border-bottom {
                // border-bottom: 1px solid $c-gray-300;
            }
            .bm-dropdown-wrapper__arrow-btn {
                width: 32px;
                height: 32px;
                // background: $c-blue-main;
                display: flex;
                justify-content: center;
                align-items: center;
                // border-radius: $br-xl;
                cursor: pointer;
                position: absolute;
                left: calc(50% - 8px);
                top: calc(50% - 16px);
                &:deep(.bm-icon) {
                    line-height: 0;
                    svg {
                        //  transition: $trans-basic;
                        transform: rotate(180deg);
                    }
                }
            }
        }
    }
</style>
