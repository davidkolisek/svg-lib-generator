<template>
    <component :is="component" :class="getClassList()">
        <slot></slot>
    </component>
</template>

<script>
    export default {
        name: 'BmBox',
        props: {
            // 4,8,12,16,20,24,28,32,40
            // {xs: 8, md: 16}
            component: {
                type: String,
                default: 'div'
            },
            mt: { type: [Object, String], default: null },
            mr: { type: [Object, String], default: null },
            mb: { type: [Object, String], default: null },
            ml: { type: [Object, String], default: null },
            pt: { type: [Object, String], default: null },
            pr: { type: [Object, String], default: null },
            pb: { type: [Object, String], default: null },
            pl: { type: [Object, String], default: null },
            position: { type: [Object, String], default: null },
            display: { type: [Object, String], default: null },
            alignItems: { type: [Object, String], default: null },
            justifyContent: { type: [Object, String], default: null },
            flexDirection: { type: [Object, String], default: null },
            gap: { type: [Object, String], default: null },
            textAlign: { type: [Object, String], default: null },
            //ak chceme aby box mal 100% sirku (napriklad pri display:flex)
            fullWidth: { type: [Boolean], default: false }
        },
        setup(props) {
            const getClassList = () => {
                let list = []
                const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
                if (props.fullWidth) {
                    list.push(`bm-box-w-full`)
                }

                const generateClassesForObject = (prefix, props) => {
                    for (const size of sizes) {
                        if (props[size]) {
                            list.push(`${prefix}-${props[size]}-${size}`)
                        }
                    }
                }

                const createClasses = (classPrefix, properties) => {
                    if (typeof properties === 'object' && properties !== null) {
                        // Loop over the sizes and add class names
                        generateClassesForObject(classPrefix, properties)
                    } else if (typeof properties === 'string') {
                        // Add the class name directly
                        list.push(`${classPrefix}-${properties}`)
                    }
                }

                // Loop over the sides
                for (const side of ['mt', 'mr', 'mb', 'ml', 'pt', 'pr', 'pb', 'pl']) {
                    // Check if the prop value is an object or a string
                    if (typeof props[side] === 'object' && props[side] !== null) {
                        // Loop over the sizes and add class names
                        for (const size of sizes) {
                            if (props[side][size] !== undefined) {
                                list.push(`bm-box-${side}-${size}-${props[side][size]}`)
                            }
                        }
                    } else if (typeof props[side] === 'string') {
                        // Add the class name directly
                        list.push(`bm-box-${side}-${props[side]}`)
                    }
                }

                createClasses('bm-box-pos', props.position)
                createClasses('bm-box-d', props.display)
                createClasses('bm-box-ai', props.alignItems)

                createClasses('bm-box-jc', props.justifyContent)
                createClasses('bm-box-fd', props.flexDirection)
                createClasses('bm-box-g', props.gap)
                createClasses('bm-box-ta', props.textAlign)

                return list
            }

            return {
                getClassList
            }
        }
    }
</script>
<style lang="scss">
    //aktualne pouzivame spacing +4px (0,4,8,12,16,20,24...) po 32px
    $inc-num: 10; //pocet iteracii
    $base-space: 4px; //zakladny spacing

    $space-properties: (
        'mt': 'margin-top',
        'mr': 'margin-right',
        'mb': 'margin-bottom',
        'ml': 'margin-left',
        'pt': 'padding-top',
        'pr': 'padding-right',
        'pb': 'padding-bottom',
        'pl': 'padding-left'
    );

    $positions: (relative, absolute, fixed, sticky, static, unset, inherit);

    $displays: (block, flex, grid, inline, inline-block, none, table, table-cell);

    $alignItemss: (baseline, center, flex-end, flex-start, unset);

    $justifyContents: (center, flex-end, flex-start, space-around, space-between);

    $flexDirections: (row, column);

    $textAligns: (left, center, right);

    //spacings
    .bm-box {
        @each $prop, $name in $space-properties {
            &-#{$prop} {
                @for $i from 0 through $inc-num {
                    &-#{$i * 4} {
                        #{$name}: #{$i * 4}px;
                    }
                }
            }
        }
        @each $property, $property-name in $space-properties {
            &-#{$property} {
                @each $breakpoint, $width in $breakpoints-rev {
                    @if $width {
                        @media (min-width: $width) {
                            &-#{$breakpoint} {
                                @for $i from 0 through $inc-num {
                                    &-#{($i * 4)} {
                                        #{$property-name}: $base-space * $i;
                                    }
                                }
                            }
                        }
                    } @else {
                        &-xs {
                            @for $i from 0 through $inc-num {
                                &-#{($i * 4)} {
                                    #{$property-name}: $base-space * $i;
                                }
                            }
                        }
                    }
                }
            }
        }
        &-w-full {
            width: 100%;
        }
    }

    //positions
    @each $position in $positions {
        .bm-box-pos-#{$position} {
            position: $position;
        }
    }
    @each $bp, $width in $breakpoints-rev {
        @media (min-width: #{$width}) {
            @each $position in $positions {
                .bm-box-pos-#{$position}-#{$bp} {
                    position: $position;
                }
            }
        }
        @if $width == null {
            @each $position in $positions {
                .bm-box-pos-#{$position}-#{$bp} {
                    position: $position;
                }
            }
        }
    }

    //displays
    @each $display in $displays {
        .bm-box-d-#{$display} {
            display: $display;
        }
    }
    @each $bp, $width in $breakpoints-rev {
        @media (min-width: #{$width}) {
            @each $display in $displays {
                .bm-box-d-#{$display}-#{$bp} {
                    display: $display;
                }
            }
        }
        @if $width == null {
            @each $display in $displays {
                .bm-box-d-#{$display}-#{$bp} {
                    display: $display;
                }
            }
        }
    }

    //align items
    @each $alignItems in $alignItemss {
        .bm-box-ai-#{$alignItems} {
            align-items: $alignItems;
        }
    }
    @each $bp, $width in $breakpoints-rev {
        @media (min-width: #{$width}) {
            @each $alignItems in $alignItemss {
                .bm-box-ai-#{$alignItems}-#{$bp} {
                    align-items: $alignItems;
                }
            }
        }
        @if $width == null {
            @each $alignItems in $alignItemss {
                .bm-box-ai-#{$alignItems}-#{$bp} {
                    align-items: $alignItems;
                }
            }
        }
    }

    //justify contents
    @each $justifyContent in $justifyContents {
        .bm-box-jc-#{$justifyContent} {
            justify-content: $justifyContent;
        }
    }
    @each $bp, $width in $breakpoints-rev {
        @media (min-width: #{$width}) {
            @each $justifyContent in $justifyContents {
                .bm-box-jc-#{$justifyContent}-#{$bp} {
                    justify-content: $justifyContent;
                }
            }
        }
        @if $width == null {
            @each $justifyContent in $justifyContents {
                .bm-box-jc-#{$justifyContent}-#{$bp} {
                    justify-content: $justifyContent;
                }
            }
        }
    }

    //flex directions
    @each $flexDirection in $flexDirections {
        .bm-box-fd-#{$flexDirection} {
            flex-direction: $flexDirection;
        }
    }
    @each $bp, $width in $breakpoints-rev {
        @media (min-width: #{$width}) {
            @each $flexDirection in $flexDirections {
                .bm-box-fd-#{$flexDirection}-#{$bp} {
                    flex-direction: $flexDirection;
                }
            }
        }
        @if $width == null {
            @each $flexDirection in $flexDirections {
                .bm-box-fd-#{$flexDirection}-#{$bp} {
                    flex-direction: $flexDirection;
                }
            }
        }
    }

    //text aligns
    @each $textAlign in $textAligns {
        .bm-box-ta-#{$textAlign} {
            text-align: $textAlign;
        }
    }
    @each $bp, $width in $breakpoints-rev {
        @media (min-width: #{$width}) {
            @each $textAlign in $textAligns {
                .bm-box-ta-#{$textAlign}-#{$bp} {
                    text-align: $textAlign;
                }
            }
        }
        @if $width == null {
            @each $textAlign in $textAligns {
                .bm-box-ta-#{$textAlign}-#{$bp} {
                    text-align: $textAlign;
                }
            }
        }
    }

    //gap
    $gaps: (4, 8, 16, 24, 32);
    .bm-box-g {
        @each $gap in $gaps {
            &-#{$gap} {
                gap: #{$gap}px;
            }
        }
    }
</style>
