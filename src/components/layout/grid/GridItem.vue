<template>
    <div :class="getClassList()">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'BmGridItem',
        props: {
            xs: { type: [Object, String, Number], default: '12' },
            sm: { type: [Object, String, Number], default: null },
            md: { type: [Object, String, Number], default: null },
            lg: { type: [Object, String, Number], default: null },
            xl: { type: [Object, String, Number], default: null },
            xxl: { type: [Object, String, Number], default: null }
        },
        setup(props) {
            const getClassList = () => {
                let list = ['bm-grid-item']
                if (props.xs) list.push(`bm-grid-item-${props.xs}`)
                if (props.sm) list.push(`bm-grid-item-${props.sm}-sm`)
                if (props.md) list.push(`bm-grid-item-${props.md}-md`)
                if (props.lg) list.push(`bm-grid-item-${props.lg}-lg`)
                if (props.xl) list.push(`bm-grid-item-${props.xl}-xl`)
                if (props.xxl) list.push(`bm-grid-item-${props.xxl}-xxl`)

                return list
            }

            return {
                getClassList
            }
        }
    }
</script>
<style lang="scss">
    $cols: (12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1);

    @each $col in $cols {
        .bm-grid-item-#{$col} {
            flex-basis: calc($col / 12) * 100%;
            max-width: calc($col / 12) * 100%;
            flex-grow: 0;
        }
    }

    @each $bp, $width in $breakpoints-rev {
        @media (min-width: #{$width}) {
            @each $col in $cols {
                .bm-grid-item-#{$col}-#{$bp} {
                    flex-basis: calc($col / 12) * 100%;
                    max-width: calc($col / 12) * 100%;
                    flex-grow: 0;
                }
            }
        }
    }
</style>
