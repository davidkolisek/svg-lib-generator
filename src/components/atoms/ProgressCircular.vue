<template>
    <div :class="getClassList()"></div>
</template>
<script>
    export default {
        name: 'BmProgressCircular',
        props: {
            size: {
                type: String,
                default: 'md',
                validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
            },
            variant: {
                type: String,
                default: 'blue',
                validator: (value) =>
                    ['blue', 'green', 'red', 'white', 'yellow', 'purple'].includes(value)
            }
        },
        setup(props) {
            const getClassList = () => {
                const list = ['bm-progress-circular']
                if (props.size) list.push(`bm-progress-circular__${props.size}`)
                if (props.variant) list.push(`bm-progress-circular__${props.variant}`)
                return list.join(' ')
            }
            return { getClassList }
        }
    }
</script>
<style lang="scss" scoped>
    .bm-progress-circular {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        animation: spin 1s ease infinite;
        &__sm {
        }
        &__md {
        }
        &__lg {
        }
        &__xl {
        }
        &__blue {
            border: 4px solid $c-blue-400;
            border-top-color: $c-blue-400;
        }
        &__green {
            border: 4px solid $c-green-400;
            border-top-color: $c-green-500;
        }
        &__red {
            border: 4px solid $c-red-400;
            border-top-color: $c-red-500;
        }
        &__white {
            border: 4px solid $c-white-500;
            border-top-color: $c-gray-300;
        }
        &__purple {
            border: 4px solid $c-purple-400;
            border-top-color: $c-purple-50;
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
