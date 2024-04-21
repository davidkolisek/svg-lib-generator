<template>
    <router-link :to="goTo" :class="getClassList()">
        {{ text }}
        <slot />
    </router-link>
</template>

<script>
    export default {
        name: 'BmAppLink',
        props: {
            goTo: {
                type: Object,
                required: true
            },
            text: {
                type: String,
                default: ''
            },
            variant: {
                type: String,
                default: 'blue-dark'
            }
        },
        setup(props) {
            const getClassList = () => {
                let list = ['bm-app-link']
                if (props.variant) {
                    list.push(`bm-app-link-${props.variant}`)
                }
                return list
            }
            return { getClassList }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-app-link {
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
        &-blue-dark {
            color: $c-blue-dark-400;
            &:hover {
                color: $c-blue-dark-400;
            }
        }
        &-purple {
            color: $c-purple-400;
            &:hover {
                color: $c-purple-400;
            }
        }
    }
</style>
