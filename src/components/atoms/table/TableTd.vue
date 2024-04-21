<template>
    <bm-box :class="getClassList()">
        <slot />
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    export default {
        name: 'BmTableTd',
        components: { BmBox },
        props: {
            data: {
                type: Array,
                default: () => []
            }
        },
        setup() {
            const getClassList = () => {
                let list = ['bm-table-td']
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
    .bm-table-td {
        display: table-cell;
        padding: 16px;
        border-bottom: 1px solid $c-gray-50;
    }
</style>
