<template>
    <button :class="getClassList()" @click="tooltipClick()">
        <bm-icon :icon="tooltipIcon" :size="18" />
    </button>
</template>
<script>
    import BmIcon from '@atoms/Icon.vue'
    import { inject } from 'vue'

    export default {
        name: 'BmTooltip',
        components: { BmIcon },
        props: {
            onClick: {
                type: Function,
                default: () => {}
            },
            title: {
                type: String,
                default: ''
            },
            content: {
                type: [Object, String],
                default: ''
            },
            tooltipType: {
                type: [Object, String],
                default: ''
            },
            tooltipIcon: {
                type: String,
                default: 'circle-question'
            },
            // mame tooltip s ikonou, ktora ma specificky styl (bordered), defaultne je bez stylu
            iconStyle: {
                type: String,
                default: ''
            }
        },
        setup(props) {
            const emitter = inject('emitter') // Inject `emitter`

            const tooltipClick = () => {
                let tooltipData = {
                    type: '', // reprezentuje typ tooltipu, ktory sa ma otvorit (pouzit 'custom' ak chceme customizovat tooltip)
                    icon: '', // ikona vedla tooltip title
                    customFooter: '', // ak chceme custom footer, tak true
                    title: '', // ak sme pouzili type custom, tak mozme definovat custom title
                    text: '' // ak sme pouzili type custom, tak mozme definovat custom text
                }

                // potrebujeme tooltip posielat ako string ale niekedy aj ako object
                if (typeof props.tooltipType === 'string') {
                    // If tooltipType is a string, use it directly
                    tooltipData = props.tooltipType
                } else if (typeof props.tooltipType === 'object') {
                    // If tooltipType is an object, extract the properties
                    tooltipData.type = props.tooltipType.type || ''
                    tooltipData.title = props.tooltipType.title || ''
                    tooltipData.text = props.tooltipType.text || ''
                    tooltipData.icon = props.tooltipType.icon || 'circle-info'
                    tooltipData.customFooter = props.tooltipType.customFooter || false
                }

                emitter.emit('open-modal', tooltipData)
            }

            const getClassList = () => {
                let list = ['bm-tooltip']
                if (props.iconStyle) list.push(`bm-tooltip__${props.iconStyle}`)
                return `${list.join(' ')}`
            }

            return {
                getClassList,
                tooltipClick
            }
        }
    }
</script>
<style lang="scss" scoped>
    .bm-tooltip {
        max-width: 18px;
        max-height: 18px;
        padding: 0;
        margin: 0;
        border: none;
        background: transparent;
        &:hover,
        &:focus,
        &:active {
            cursor: pointer;
            &:deep(svg) {
                path {
                    transition: $trans-primary;
                    fill: $c-blue-500;
                }
            }
        }
        &:deep(svg) {
            path {
                transition: $trans-primary;
                fill: $c-blue-300;
            }
        }
        &__bordered {
            width: 20px;
            height: 20px;
            max-width: 20px;
            min-width: 20px;
            max-height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid $c-gray-500;
            border-radius: $br-large;
            margin-left: auto;
            &:deep(.bm-icon) {
                line-height: 0;
                svg {
                    width: 10px;
                    height: 10px;
                    path {
                        fill: $c-black-500;
                    }
                }
            }
        }
    }
</style>
