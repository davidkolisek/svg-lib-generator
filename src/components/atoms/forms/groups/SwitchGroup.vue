<template>
    <div :class="getClassList()">
        <bm-form-label :id="id" :label="label" :description="description" v-if="label" />
        <div class="bm-switch-group__items">
            <slot />
        </div>
        <bm-error v-if="error" error-message="Error text" />
    </div>
</template>

<script>
    import BmFormLabel from '@atoms/forms/labels/FormLabel.vue'
    import BmError from '@atoms/forms/Error.vue'

    export default {
        name: 'BmSwitchGroup',
        components: { BmError, BmFormLabel },
        props: {
            id: {
                type: String,
                default: ''
            },
            label: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            },
            error: {
                type: Boolean,
                default: false
            }
        },
        setup(props) {
            const getClassList = () => {
                let list = ['bm-switch-group']
                if (props.error) {
                    list.push(`bm-switch-group__error`)
                }
                return `${list.join(' ')}`
            }
            return {
                getClassList
            }
        }
    }
</script>

<style lang="scss" scoped>
    //pri switch componente nemame moznost horizontal/vertical pre itemy. Stylujem len vertical
    .bm-switch-group {
        & > :deep(.bm-label) {
            margin-bottom: 8px;
            display: block;
        }
        &:deep(.bm-switch) {
            margin-bottom: 8px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        &:deep(.bm-error) {
            margin-top: 8px;
        }
    }
</style>
