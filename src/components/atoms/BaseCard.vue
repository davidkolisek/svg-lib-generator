<template>
    <bm-box :class="getClassList()">
        <bm-block-header
            v-if="title"
            :title-icon="titleIcon"
            :title="title"
            :action-click="actionClick"
            :action-click-hidden="actionClickHidden"
            :action-icon-color="actionIconColor"
            :action-icon="actionIcon"
            :tooltip-type="tooltipType"
        />
        <bm-typography
            v-if="description"
            variant="caption"
            component="p"
            color="gray"
            class="bm-base-card__description"
        >
            {{ description }}
        </bm-typography>
        <bm-box class="bm-base-card__content">
            <slot />
        </bm-box>
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmBlockHeader from '@atoms/BlockHeader.vue'
    import BmTypography from '@atoms/Typography.vue'

    export default {
        name: 'BmBaseCard',
        components: { BmTypography, BmBlockHeader, BmBox },
        props: {
            title: {
                type: String,
                default: ''
            },
            titleIcon: {
                type: String,
                default: ''
            },
            actionIcon: {
                type: String,
                default: 'circle-question'
            },
            actionIconColor: {
                type: String,
                default: '#4C92CF'
            },
            actionClick: {
                type: Function,
                default: null
            },
            actionClickHidden: {
                type: Boolean,
                default: false
            },
            description: {
                type: String,
                default: ''
            },
            tooltipType: {
                type: [String, Object],
                default: ''
            },
            variant: {
                type: String,
                default: 'white'
            }
        },
        setup(props) {
            const getClassList = () => {
                const list = ['bm-base-card']
                if (props.variant) list.push(`bm-base-card__${props.variant}`)
                return list.join(' ')
            }
            return { getClassList }
        }
    }
</script>
<style lang="scss" scoped>
    .bm-base-card {
        background: $c-white-500;
        padding: 16px;
        border-radius: $br-medium;
        box-shadow: $bs-soft;
        &__white {
            background: $c-white-500;
        }
        &__gray-gradient {
            background: $c-gray-gradient-main;
        }
        :deep(.bm-block-header) {
            margin-bottom: 12px;
        }
        &__description {
            margin: 0 0 16px;
        }
        &__content {
        }
    }
</style>
