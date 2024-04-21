<template>
    <template v-if="translateHtml">
        <!--eslint-disable vue/no-v-text-v-html-on-component-->
        <component v-html="sanitizeHTML(translateHtml)" :is="component" :class="getClassList()" />
    </template>
    <template v-else>
        <component :is="component" :class="getClassList()">
            <slot></slot>
        </component>
    </template>
</template>

<script>
    import DOMPurify from 'dompurify'
    export default {
        name: 'BmTypography',
        props: {
            component: {
                type: String,
                required: true
            },
            variant: {
                type: String,
                default: 'p'
            },
            color: {
                type: String,
                default: 'black'
            },
            fontWeight: {
                type: String,
                default: ''
            },
            textAlign: {
                type: String,
                default: ''
            },
            translateHtml: {
                type: String,
                default: ''
            }
        },
        setup(props) {
            const getClassList = () => {
                const list = ['bm-typography']
                if (props.component) {
                    if (props.variant === 'p') {
                        list.push(`bm-typography-${props.component}`)
                    } else {
                        list.push(`bm-typography-${props.variant}`)
                    }
                }
                if (props.color) {
                    list.push(`bm-typography-${props.color}`)
                }
                if (props.fontWeight) {
                    list.push(`bm-typography-fw-${props.fontWeight}`)
                }
                if (props.textAlign) {
                    list.push(`bm-typography-ta-${props.textAlign}`)
                }
                return list.join(' ')
            }
            const sanitizeHTML = (html) => {
                return DOMPurify.sanitize(html, { ADD_ATTR: ['target'] })
            }

            return {
                getClassList,
                sanitizeHTML
            }
        }
    }
</script>

<style scoped lang="scss">
    //$f-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    //$font-secondary: "Lato", sans-serif;

    $font-weights: 100, 200, 300, 400, 500, 600, 700, 800, 900;
    $textAligns: (left, center, right);

    .bm-typography {
        font-style: normal;
        //headings
        &-h1,
        &-h2,
        &-h3,
        &-h4 {
            font-family: $f-secondary;
            font-weight: 700;
            letter-spacing: 0.01em;
            margin: 0;
            line-height: normal;
        }

        //paragraphs
        &-p,
        &-masive,
        &-caption,
        &-perex,
        &-span {
            font-family: $f-primary;
            font-weight: 400;
            margin: 0;
            line-height: normal;
        }

        //variants
        &-h1 {
            font-size: 1.5rem;
            @media (min-width: $bp-mobile) {
                font-size: 2.125rem;
            }
        }

        &-h2 {
            font-size: 1.375rem;
            @media (min-width: $bp-mobile) {
                font-size: 1.75rem;
            }
        }

        &-h3 {
            font-size: 1.125rem;
            @media (min-width: $bp-mobile) {
                font-size: 1.313rem;
            }
        }

        &-h4 {
            font-size: 1rem;
            @media (min-width: $bp-mobile) {
                font-size: 1rem;
            }
        }

        &-p {
            font-size: 0.875rem;
            @media (min-width: $bp-mobile) {
                font-size: 1rem;
            }
        }

        &-masive {
            //LEAD based on KP
            font-size: 1.313rem;
        }

        &-caption {
            //CAPTIOn based on KP
            font-size: 0.875rem;
        }

        &-perex {
            font-size: 1.125rem;
        }

        //colors
        &-black {
            color: $c-black-500;
        }

        &-blue {
            color: $c-blue-500;
        }

        &-white {
            color: $c-white-500;
        }

        &-gray {
            color: $c-gray-500;
        }
        &-yellow {
            color: $c-yellow-500;
        }
        &-purple {
            color: $c-purple-300;
        }
        &-green {
            color: $c-green-500;
        }
        //font-weights
        @each $fw in $font-weights {
            &-fw-#{$fw} {
                font-weight: $fw;
            }
        }
        //font-weights
        @each $fw in $font-weights {
            &-fw-#{$fw} {
                font-weight: $fw;
            }
        }

        //text aligns
        @each $textAlign in $textAligns {
            &-ta-#{$textAlign} {
                text-align: $textAlign;
            }
        }
    }
</style>
