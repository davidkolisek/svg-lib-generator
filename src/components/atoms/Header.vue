<template>
    <bm-box class="bm-header-main">
        <bm-typography component="h1" variant="h1" class="bm-header__title">
            {{ title }}
        </bm-typography>
        <bm-typography component="p" variant="p" class="bm-header__desc">
            {{ description }}
        </bm-typography>
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmTypography from '@atoms/Typography.vue'
    export default {
        name: 'BmHeader',
        components: { BmTypography, BmBox },
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
                let list = ['bm-app-link']
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
    .bm-header-main {
        padding: 24px 0;
        &:deep(.bm-typography) {
            color: $c-cyan-dark-400;
        }
    }
</style>
