<template>
    <bm-base-card class="table-card" :title="title" :description="description">
        <bm-box :class="getClassList()">
            <slot name="tableHead" />
            <slot name="tableBody" />
        </bm-box>
        <bm-box mt="24" full-width>
            <slot name="tableAction" />
        </bm-box>
    </bm-base-card>
</template>

<script>
    import BmBaseCard from '@atoms/BaseCard.vue'
    import BmBox from '@/components/layout/Box.vue'
    export default {
        name: 'BmTable',
        components: { BmBox, BmBaseCard },
        props: {
            title: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            }
        },
        setup() {
            const getClassList = () => {
                let list = ['bm-table']
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
    .table-card {
        &:deep(.bm-base-card__content) {
            overflow-x: auto;
        }
    }
    .bm-table {
        display: table;
        width: 100%;
        &:deep(.bm-table-head) {
            .bm-table-td {
                &:last-child {
                    text-align: right;
                }
            }
        }
        &:deep(.bm-table-row) {
            .bm-table-td {
                &:last-child {
                    text-align: right;
                }
            }
        }
    }
</style>
