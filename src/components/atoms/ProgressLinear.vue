<template>
    <div :class="getClassList()">
        <div class="progress-bar-value"></div>
    </div>
</template>
<script>
    export default {
        name: 'BmProgressLinear',
        props: {
            variant: {
                type: String,
                default: 'blue',
                validator: (value) => ['blue', 'green', 'red', 'white'].includes(value)
            }
        },
        setup(props) {
            const getClassList = () => {
                const list = ['bm-progress-linear']
                if (props.variant) list.push(`bm-progress-linear__${props.variant}`)
                return list.join(' ')
            }
            return { getClassList }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-progress-linear {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background-color: $c-white-500;
        width: 100%;
        overflow: hidden;
        z-index: 9999;
        .progress-bar-value {
            width: 100%;
            height: 100%;
            animation: indeterminateAnimation 1s infinite linear;
            transform-origin: 0 50%;
        }
        &__blue {
            .progress-bar-value {
                background-color: $c-blue-500;
            }
        }
        &__green {
            .progress-bar-value {
                background-color: $c-green-500;
            }
        }
        &__red {
            .progress-bar-value {
                background-color: $c-red-500;
            }
        }
        &__white {
            .progress-bar-value {
                background-color: $c-white-500;
            }
        }
    }

    @keyframes indeterminateAnimation {
        0% {
            transform: translateX(0) scaleX(0);
        }
        40% {
            transform: translateX(0) scaleX(0.4);
        }
        100% {
            transform: translateX(100%) scaleX(0.5);
        }
    }
</style>
