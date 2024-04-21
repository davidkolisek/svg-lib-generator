<template>
    <label :for="id" :class="getClassList()">
        <bm-box component="span" v-if="icon" class="bm-value-label__icon">
            <bm-icon :icon="icon" :size="iconSize" />
        </bm-box>
        <bm-box component="span" class="bm-value-label__text-content">
            <!--            lava strana pre label-->
            <bm-box component="span" class="bm-value-label__label-wrapper">
                <template v-if="translateHtmlLabel">
                    <!--eslint-disable vue/no-v-text-v-html-on-component-->
                    <component v-html="sanitizeHTML(translateHtmlLabel)" :is="'span'" />
                </template>
                <bm-box component="span" v-if="label" class="bm-value-label__text">
                    {{ label }}
                </bm-box>
                <bm-box component="span" v-if="labelOptional" class="bm-value-label__optional">
                    {{ labelOptional }}
                </bm-box>
            </bm-box>
            <!--          obalovac pre label value, optional (prava strana)-->
            <bm-box
                component="span"
                class="bm-value-label__label-values"
                v-if="$slots.labelSecond || labelSecond"
            >
                <bm-box component="span" v-if="labelSecond" class="bm-value-label__label-value">
                    {{ labelSecond }}
                </bm-box>
                <bm-box
                    component="span"
                    class="bm-value-label__label-value-slot"
                    v-if="$slots.labelSecond"
                >
                    <slot name="labelSecond" />
                </bm-box>
            </bm-box>
            <bm-box component="span" v-if="tooltipType" class="bm-value-label__tooltip">
                <bm-tooltip v-if="tooltipType" :tooltip-type="tooltipType" />
            </bm-box>
        </bm-box>
    </label>
</template>

<script>
    import BmIcon from '@atoms/Icon.vue'
    import BmBox from '@/components/layout/Box.vue'
    import BmTooltip from '@atoms/Tooltip.vue'
    import DOMPurify from 'dompurify'

    export default {
        name: 'BmValueLabel',
        components: { BmBox, BmIcon, BmTooltip },
        props: {
            id: {
                type: [Number, String],
                required: true
            },
            label: {
                type: String,
                default: ''
            },
            translateHtmlLabel: {
                type: String,
                default: ''
            },
            //secondary label
            labelSecond: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
            iconSize: {
                type: [String, Number],
                default: 16
            },
            //optional gray label
            labelOptional: {
                type: String,
                default: ''
            },
            direction: {
                type: String,
                default: 'horizontal',
                validator: (labelSecond) => {
                    return ['vertical', 'horizontal'].includes(labelSecond)
                }
            },
            //tooltip
            tooltipType: {
                type: [String, Object],
                default: ''
            }
        },
        setup(props) {
            const getClassList = () => {
                const classList = ['bm-value-label']
                if (props.direction) {
                    classList.push(`bm-value-label__${props.direction}`)
                }
                if (props.labelSecond) {
                    classList.push('bm-value-label--value')
                }
                return classList
            }

            const sanitizeHTML = (html) => {
                return DOMPurify.sanitize(html)
            }

            return {
                getClassList,
                sanitizeHTML
            }
        }
    }
</script>
<style lang="scss" scoped>
    .bm-value-label {
        font-family: $f-primary;
        font-size: 1rem;
        display: inline-block;

        //obalovac pre textovu cast
        &__text-content {
            display: flex;
            //lava strana (labeltext,optional)
            .bm-value-label__label-wrapper {
                display: block;
                align-items: baseline;
                .bm-value-label__text {
                    color: $c-black-500;
                    font-size: 1rem;
                    font-weight: 600;
                    line-height: 21px;
                    display: inline-block;
                    align-items: baseline;
                    margin-right: 4px;
                }
                .bm-value-label__optional {
                    color: $c-gray-500;
                    font-size: 0.875rem;
                    font-weight: 400;
                    display: inline-block;
                }
                //ak existuje prava strana, tak jej pridavam odsadenie
                & + .bm-value-label__label-values {
                    padding-left: 14px;
                }
            }
            //prava strana (labelSecond, labelSecondslot)
            .bm-value-label__label-values {
                display: flex;
                flex-direction: row;
                margin-left: auto;
            }
        }

        //zakladne classy od ktorych sa odrazame
        &__horizontal {
        }

        &__vertical {
            .bm-value-label__text-content {
                .bm-value-label__label-wrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
        &__tooltip {
            margin-left: 4px;
            display: flex;
            align-items: center;
            :deep(.bm-tooltip) {
                display: flex;
            }
        }
    }
</style>
