<template>
    <bm-box :class="getClassList()">
        <bm-typography component="p" class="box-name">
            {{ boxName }}
        </bm-typography>
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmTypography from '@atoms/Typography.vue'

    export default {
        name: 'ParkingBox',
        components: { BmTypography, BmBox },
        props: {
            boxName: {
                type: String,
                default: 'box'
            }
        },
        setup() {
            const getClassList = () => {
                let list = ['parking-box']
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
    .parking-box {
        width: 100%;
        height: 100px;
        border: 1px dashed $c-gray-200;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:deep(.box-name) {
            position: relative;
            z-index: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
        }
    }
</style>
