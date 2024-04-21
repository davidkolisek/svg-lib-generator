<template>
    <div :class="getClassList()">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'BmContainer',
        props: {
            maxWidth: {
                type: String,
                default: 'base',
                validator: (value) =>
                    ['sm', 'md', 'lg', 'xl', 'xxl', 'fluid', 'base'].includes(value)
            }
        },
        setup(props) {
            const getClassList = () => {
                let list = ['bm-container']
                if (props.maxWidth) {
                    list.push(`bm-container-${props.maxWidth}`)
                }
                return list
            }
            return {
                getClassList
            }
        }
    }
</script>
<style lang="scss">
    // Variables
    $container-max-widths: (
        sm: 540px,
        md: 720px,
        lg: 960px,
        xl: 1140px,
        xxl: 1320px
    );

    // Container
    .bm-container {
        box-sizing: border-box;
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        @media (min-width: $bp-dinosaur) {
            max-width: 540px;
        }
        @media (min-width: $bp-mobile) {
            max-width: 720px;
        }
        @media (min-width: $bp-tablet) {
            max-width: 960px;
        }
        @media (min-width: $bp-laptop) {
            max-width: 1140px;
        }
        @media (min-width: $bp-laptopxl) {
            max-width: 1320px;
        }
        &-fluid {
            max-width: unset;
        }

        &-sm {
            @media (min-width: $bp-dinosaur) {
                max-width: 540px;
            }
        }

        &-md {
            @media (min-width: $bp-mobile) {
                max-width: 720px;
            }
        }

        &-lg {
            @media (min-width: $bp-tablet) {
                max-width: 960px;
            }
        }

        &-xl {
            @media (min-width: $bp-laptop) {
                max-width: 1140px;
            }
        }

        &-xxl {
            @media (min-width: $bp-laptopxl) {
                max-width: 1320px;
            }
        }
    }
</style>
