<template>
    <bm-box :class="getClassList()">
        <bm-box class="bm-label-text-item__left">
            <!--      moze vstupovat ako prop-->
            <bm-typography v-if="label" component="span" variant="caption" color="gray">
                {{ label }}
            </bm-typography>
            <!--      moze vstupovat ako slot-->
            <slot name="label" />
        </bm-box>
        <bm-box class="bm-label-text-item__right">
            <!--      moze vstupovat ako prop-->
            <bm-typography v-if="value !== ''" component="p">
                {{ value }}
            </bm-typography>
            <!--      moze vstupovat ako slot-->
            <slot name="value" />
        </bm-box>
    </bm-box>
</template>
<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmTypography from '@atoms/Typography.vue'

    export default {
        name: 'BmLabelTextItem',
        components: { BmTypography, BmBox },
        props: {
            label: {
                type: String,
                default: ''
            },
            value: {
                type: [String, Number],
                default: ''
            },
            //TODO zatial sa nevyuziva ale je to pripravene do buducna
            direction: {
                type: String,
                default: 'horizontal',
                validator: (value) => {
                    return ['vertical', 'horizontal'].includes(value)
                }
            }
        },
        setup(props) {
            const getClassList = () => {
                const list = ['bm-label-text-item']
                if (props.direction) {
                    list.push(`bm-label-text-item-${props.direction}`)
                }
                return list.join(' ')
            }
            return {
                getClassList
            }
        }
    }
</script>

<style scoped lang="scss">
    .bm-label-text-item {
        width: 100%;
        display: table-row;
        &:last-child {
            margin-bottom: 0;
        }
        &__left,
        &__right {
            display: table-cell;
            padding-bottom: 16px;
        }
        &__left {
            padding-right: 20px;
            vertical-align: bottom;
        }
        &__right {
            vertical-align: bottom;
            min-width: 120px;
            @media (min-width: $bp-mobile) {
                min-width: 150px;
            }
        }
        &-vertical {
            display: flex;
            flex-direction: column;
            .bm-label-text-item__left {
                padding-bottom: 4px;
            }
            .bm-label-text-item__right {
                padding-bottom: 0;
            }
        }
    }
</style>
