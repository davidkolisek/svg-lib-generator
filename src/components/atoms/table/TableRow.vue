<template>
    <bm-box :class="getClassList()">
        <slot />
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    export default {
        name: 'BmTableRow',
        components: { BmBox },
        props: {
            data: {
                type: Array,
                default: () => []
            }
        },
        setup() {
            const getClassList = () => {
                let list = ['bm-table-row']
                // if (props.variant) {
                //     list.push(`bm-app-link-${props.variant}`)
                // }
                return list
            }
            return { getClassList }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-table-row {
        display: table-row;
        &:deep(.bm-table-td) {
            transition: $trans-basic;
        }
        &:hover {
            &:deep(.bm-table-td) {
                background-color: $c-purple-50;
                transition: $trans-basic;
            }
        }
    }
</style>
