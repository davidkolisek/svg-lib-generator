<template>
    <div :class="getClassList()">
        <bm-typography component="p" variant="caption">
            {{ text }}
        </bm-typography>
    </div>
</template>

<script>
    import BmTypography from '@atoms/Typography.vue'
    export default {
        name: 'BmTag',
        components: { BmTypography },
        props: {
            text: {
                type: String,
                required: true
            },
            variant: {
                type: String,
                default: 'blue',
                validator: (value) => {
                    return [
                        'blue',
                        'red',
                        'orange',
                        'purple',
                        'yellow',
                        'gray',
                        'dark-gray'
                    ].includes(value)
                }
            }
        },
        setup(props) {
            const getClassList = () => {
                const list = ['bm-tag']
                if (props.variant) list.push(`bm-tag__${props.variant}`)

                return list.join(' ')
            }
            return { getClassList }
        }
    }
</script>
<style lang="scss" scoped>
    .bm-tag {
        width: fit-content;
        border-radius: $br-semi-small;
        padding: 0 16px 0;
        font-family: $f-primary;
        font-weight: 600;
        color: $c-gray-500;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 26px;
        &:deep(.bm-typography) {
            line-height: 0.875rem;
            margin: 0;
            @media (min-width: $bp-mobile) {
                line-height: 1rem;
            }
        }
        &__dark-gray {
            background: $c-dark-gray-gradient-main;
            &:deep(.bm-typography) {
                color: $c-white-500;
            }
        }
        &__blue {
            background: $c-blue-gradient-main;
            &:deep(.bm-typography) {
                color: $c-white-500;
            }
        }
        &__purple {
            background: $c-purple-gradient-main;
            &:deep(.bm-typography) {
                color: $c-white-500;
            }
        }
        &__red {
            box-shadow: 0 0 0 1px $c-red-400 inset;
            background: $c-red-100;
            &:deep(.bm-typography) {
                color: $c-red-500;
            }
        }
        &__orange {
            box-shadow: 0 0 0 1px $c-orange-400 inset;
            background: $c-orange-100;
            &:deep(.bm-typography) {
                color: $c-orange-500;
            }
        }
        &__yellow {
            box-shadow: 0 0 0 1px $c-yellow-400 inset;
            background: $c-yellow-100;
            &:deep(.bm-typography) {
                color: $c-yellow-500;
            }
        }
        &__gray {
            background: $c-gray-gradient-main;
            &:deep(.bm-typography) {
                color: $c-white-500;
            }
        }
    }
</style>
