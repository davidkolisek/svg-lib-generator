<template>
    <li :class="getClassList()">
        <bm-typography v-if="headerTitle.length > 0" component="h3">
            {{ headerTitle }}
        </bm-typography>
        <slot />
    </li>
</template>

<script>
    import BmTypography from '@atoms/Typography.vue'
    export default {
        name: 'BmListItem',
        components: { BmTypography },
        props: {
            headerTitle: {
                type: String,
                default: ''
            }
        },
        setup(props) {
            const getClassList = () => {
                let list = ['bm-list-item']
                if (props.headerTitle.length > 0) list.push(`bm-list-item-has-header`)
                return `${list.join(' ')}`
            }
            return {
                getClassList
            }
        }
    }
</script>
<style lang="scss">
    .bm-list {
        .bm-list-item {
            &-has-header {
                &:before {
                    top: 8px;
                }
            }
        }
        &-unordered {
            .bm-list-item {
                &-has-header {
                    &:before {
                        top: 13px;
                    }
                }
            }
        }
        &-ordered {
            .bm-list-item {
                &-has-header {
                    &:before {
                        top: 5px;
                    }
                }
            }
        }
    }
</style>
