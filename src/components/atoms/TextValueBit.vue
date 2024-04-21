<template>
    <div :class="getClassList()">
        <bm-typography
            v-if="label"
            component="span"
            :variant="labelSecond ? 'caption' : 'perex'"
            :font-weight="labelSecond ? '400' : '600'"
            :color="labelSecond ? 'gray' : 'black'"
        >
            {{ label }}
        </bm-typography>
        <bm-typography v-if="value" component="span" variant="caption" color="gray">
            {{ value }}
        </bm-typography>
        <bm-typography component="span" variant="caption" font-weight="600">
            {{ labelSecond }}
        </bm-typography>
    </div>
</template>

<script>
    import BmTypography from '@atoms/Typography.vue'
    export default {
        name: 'BmTextValueBit',
        components: { BmTypography },
        props: {
            label: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            labelSecond: {
                type: String,
                default: ''
            }
        },
        setup(props) {
            const getClassList = () => {
                const list = ['bm-text-value-bit']
                if (props.labelSecond) list.push(`bm-text-value-bit__has-second-label`)
                return list.join(' ')
            }
            return { getClassList }
        }
    }
</script>
<style lang="scss" scoped>
    .bm-text-value-bit {
        &__has-second-label {
            & > span {
                &:nth-child(1) {
                    position: relative;
                    &:before {
                        content: '';
                        width: 100%;
                        height: 1px;
                        background: $c-gray-500;
                        position: absolute;
                        top: 50%;
                    }
                }
            }
        }
        & > span {
            &:nth-child(1) {
                display: inline-block;
                margin-right: 8px;
            }
            &:nth-child(3) {
                display: inline-block;
                margin-left: 8px;
            }
        }
    }
</style>
