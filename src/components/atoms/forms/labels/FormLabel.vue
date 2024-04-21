<template>
    <!--    mame 2 template-->
    <!--  pri vertical menime order poloziek v labli-->
    <label v-if="direction === 'vertical'" :for="id" :class="getClassList()">
        <bm-box component="span" v-if="label" class="bm-form-label__text">
            {{ label }}
        </bm-box>
        <bm-box component="span" v-if="tooltipType" class="bm-form-label__tooltip">
            <bm-tooltip v-if="tooltipType" :tooltip-type="tooltipType" />
        </bm-box>
        <bm-box component="span" v-if="description" class="bm-form-label__description">
            {{ description }}
        </bm-box>
    </label>

    <label v-else :for="id" :class="getClassList()">
        <bm-box component="span" v-if="label" class="bm-form-label__text">
            {{ label }}
        </bm-box>
        <bm-box component="span" v-if="description" class="bm-form-label__description">
            {{ description }}
        </bm-box>
        <bm-box component="span" v-if="tooltipType" class="bm-form-label__tooltip">
            <bm-tooltip :tooltip-type="tooltipType" :tooltip-icon="tooltipIcon" />
        </bm-box>
    </label>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmTooltip from '@atoms/Tooltip.vue'

    export default {
        name: 'BmFormLabel',
        components: { BmTooltip, BmBox },
        props: {
            id: {
                type: [Number, String],
                required: true
            },
            label: {
                type: String,
                default: ''
            },
            //description gray label
            description: {
                type: String,
                default: ''
            },
            direction: {
                type: String,
                default: 'vertical',
                validator: (value) => {
                    return ['vertical', 'horizontal'].includes(value)
                }
            },
            //tooltip
            tooltipType: {
                type: [String, Object],
                default: ''
            },
            tooltipIcon: {
                type: String,
                default: 'circle-question'
            }
        },
        setup(props) {
            const getClassList = () => {
                const classList = ['bm-form-label']
                if (props.direction) {
                    classList.push(`bm-form-label__${props.direction}`)
                }
                return classList
            }

            return {
                getClassList
            }
        }
    }
</script>
<style lang="scss" scoped>
    .bm-form-label {
        font-family: $f-secondary;
        font-size: 0.875rem;
        display: flex;
        margin-bottom: 4px;
        align-items: center;
        & > span {
            line-height: 21px;
        }

        &__text {
            color: $c-black-500;
            font-size: 0.8rem;
            font-weight: 600;
            @media (min-width: $bp-mobile) {
                font-size: 0.875rem;
            }
        }
        &__tooltip {
            margin-left: 8px;
            :deep(.bm-tooltip) {
                display: flex;
                .bm-icon {
                    display: flex;
                }
            }
        }

        &__description {
            color: $c-gray-500;
            font-size: 0.875rem;
            font-weight: 400;
        }

        &__horizontal {
            .bm-form-label__description {
                margin-left: 4px;
            }
        }

        &__vertical {
            align-items: start;
            flex-direction: row;
            flex-wrap: wrap;
            .bm-form-label__description {
                width: 100%;
                margin-top: 4px;
            }
        }
    }
</style>
