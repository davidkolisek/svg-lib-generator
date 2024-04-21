<template>
    <div :class="getClassList()">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'BmGridLayout',
        props: {
            spacing: { type: [Object, String, Number], default: null }
        },
        setup(props) {
            const getClassList = () => {
                const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
                let list = ['bm-grid-layout']
                const addClasses = (prefix, props, suffix = '') => {
                    for (const size of sizes) {
                        if (props[size]) {
                            list.push(`${prefix}-${size}-${props[size]}${suffix}`)
                        }
                        if (size === 'xs' && props[size] !== undefined) {
                            list.push(`${prefix}-${props[size]}${suffix}`)
                        }
                    }
                }

                // Check if the position prop is an object or a string
                if (typeof props.spacing === 'object' && props.spacing !== null) {
                    // Loop over the sizes and add class names
                    addClasses('bm-grid-layout', props.spacing)
                } else if (typeof props.spacing === 'string') {
                    // Add the class name directly
                    list.push(`bm-grid-layout-${props.spacing}`)
                }

                return list
            }

            return {
                getClassList
            }
        }
    }
</script>
<style scoped lang="scss">
    $gaps: (4, 8, 16, 24, 32); //v pripade potreby gapu, pridat cislo

    .bm-grid-layout {
        box-sizing: border-box;
        display: flex;
        flex-flow: row wrap;
        @each $gap in $gaps {
            @each $bp, $width in $breakpoints-rev {
                @if $width != null {
                    &-#{$bp}-#{$gap} {
                        @media (min-width: #{$width}) {
                            width: calc(100% + #{$gap}px);
                            margin-top: -#{$gap}px;
                            margin-left: -#{$gap}px;
                            &:deep(.bm-grid-item) {
                                padding-top: #{$gap}px;
                                padding-left: #{$gap}px;
                            }
                        }
                    }
                } @else if $width == null {
                    &-#{$gap} {
                        width: calc(100% + #{$gap}px);
                        margin-top: -#{$gap}px;
                        margin-left: -#{$gap}px;
                        &:deep(.bm-grid-item) {
                            padding-top: #{$gap}px;
                            padding-left: #{$gap}px;
                        }
                    }
                }
            }
        }
    }
</style>
