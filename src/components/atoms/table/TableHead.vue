<template>
    <bm-box :class="getClassList()">
        <slot />
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    export default {
        name: 'BmTableHead',
        components: { BmBox },
        props: {
            data: {
                type: Array,
                default: () => []
            }
        },
        setup() {
            const getClassList = () => {
                let list = ['bm-table-head']
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
    .bm-table-head {
        display: table-row;
        justify-content: space-between;
    }
</style>
