<template>
    <bm-box :class="getClassList()">
        <slot />
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    export default {
        name: 'BmFormWrapper',
        components: { BmBox },
        props: {
            // section - pre celu sekciu v steppe
            // part - pre cast sekcie v steppe (karty)
            // item - pre item v karte
            variant: {
                type: String,
                default: '',
                validate: (value) => {
                    return ['section', 'part', 'item'].includes(value)
                }
            },
            noSpacingTop: {
                type: Boolean,
                default: false
            },
            noSpacingBottom: {
                type: Boolean,
                default: false
            },
            hasDivider: {
                type: Boolean,
                default: false
            },
            isFirst: {
                type: Boolean,
                default: false
            }
        },
        setup(props) {
            const getClassList = () => {
                let list = ['bm-form-wrapper']
                if (props.variant) list.push(`bm-form-wrapper__${props.variant}`)
                if (props.noSpacingTop) list.push(`bm-form-wrapper-no-spacing-top`)
                if (props.noSpacingBottom) list.push(`bm-form-wrapper-no-spacing-bottom`)
                if (props.hasDivider) list.push(`bm-form-wrapper-has-divider`)
                if (props.isFirst) list.push(`bm-form-wrapper-is-first`)
                return `${list.join(' ')}`
            }
            return { getClassList }
        }
    }
</script>

<style lang="scss">
    .bm-form-wrapper {
        //tu riesim celu sekciu
        &__section {
            //padding: 24px 0;
            &.bm-form-wrapper-no-spacing-top {
                padding-top: 0;
                margin-top: 0;
            }
            &.bm-form-wrapper-no-spacing-bottom {
                padding-bottom: 0;
                margin-bottom: 0;
            }
            //tu riesim cast formulara (karta)
            .bm-form-wrapper__part {
                margin: 24px 0;
                &:last-child {
                    margin: 24px 0 0;
                }
                &:nth-child(1) {
                    margin: 0;
                }
                //tu riesim item
                .bm-form-wrapper__item {
                    margin-bottom: 16px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
            &.bm-form-wrapper-is-first {
                padding: 48px 0 24px;
                @media (min-width: $bp-mobile) {
                    padding: 24px 0;
                }
            }
        }
        &-no-spacing-top {
            padding-top: 0;
            margin-top: 0;
        }
        &-no-spacing-bottom {
            padding-bottom: 0;
            margin-bottom: 0;
        }
        &__item {
            margin-bottom: 16px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        &__part {
            margin: 24px 0;
            &:last-child {
                margin: 24px 0 0;
            }
            &:nth-child(1) {
                margin: 0;
            }
        }
        &__has-divider {
            border-bottom: 1px solid $c-gray-300;
            padding-bottom: 16px;
        }
    }
</style>
