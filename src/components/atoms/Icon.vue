<template>
    <span :class="getClassList">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            :viewBox="iconPath.viewBox"
            :width="`${size}px`"
            :height="`${size}px`"
        >
            <path :fill="color" :d="iconPath.d" />
        </svg>
    </span>
</template>

<script>
    import { defineComponent, computed } from 'vue'
    import { IconsPath } from '@/helpers/iconsPath'

    export default defineComponent({
        name: 'BmIcon',
        props: {
            color: {
                type: String,
                default: 'black'
            },
            size: {
                type: [Number, String],
                default: 12
            },
            icon: {
                type: String,
                required: true
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        setup(props) {
            const iconPath = computed(() => {
                return IconsPath(props.icon)
            })

            const getClassList = computed(() => {
                let list = ['bm-icon']

                if (props.disabled) {
                    list.push('bm-icon--disabled')
                }

                return list.join(' ')
            })

            return {
                iconPath,
                props,
                getClassList
            }
        }
    })
</script>

<style scoped lang="scss">
    .bm-icon {
        line-height: initial;
        display: inline-block;
        &--disabled {
            svg {
                path {
                    //fill: $c-gray-line;
                }
            }
        }
    }
</style>
