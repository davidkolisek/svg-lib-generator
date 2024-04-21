<template>
    <button :class="getClassList()">
        <bm-box component="span" class="icon-wrapper icon-wrapper-left">
            <bm-progress-circular v-if="loading && iconPosition === 'left'" :variant="color" />
            <bm-icon
                v-if="!loading && icon && iconPosition === 'left'"
                :icon="icon"
                :size="iconSize"
            />
        </bm-box>
        <span>
            <slot></slot>
        </span>
        <bm-box component="span" class="icon-wrapper icon-wrapper-right">
            <bm-progress-circular v-if="loading && iconPosition === 'right'" :variant="color" />
            <bm-icon
                v-if="!loading && icon && iconPosition === 'right'"
                :icon="icon"
                :size="iconSize"
            />
        </bm-box>
    </button>
</template>

<script>
    import BmIcon from '@atoms/Icon.vue'
    import BmBox from '@/components/layout/Box.vue'
    import BmProgressCircular from '@atoms/ProgressCircular.vue'
    export default {
        name: 'BmButton',
        components: { BmProgressCircular, BmBox, BmIcon },
        props: {
            variant: {
                type: String,
                default: 'contained' //contained, outlined, text
            },
            color: {
                type: String,
                default: 'primary' //green, blue, white, red
            },
            icon: {
                type: String, //icon-name
                default: null
            },
            size: {
                type: String, //sm, md, lg
                default: 'md'
            },
            iconPosition: {
                type: String, //left, right
                default: 'right'
            },
            iconSize: {
                type: [Number, String],
                default: 12
            },
            //replacne ikonu za loading ikonu. Pre pouzitie je potrebne mat definovany aj icon-position
            loading: {
                type: Boolean,
                default: false
            },
            fullWidth: {
                type: Boolean,
                default: false
            }
        },

        setup(props) {
            const getClassList = () => {
                let list = ['bm-btn']
                if (props.color && props.variant)
                    list.push(`bm-btn-${props.color}-${props.variant}`)
                if (props.size) list.push(`bm-btn-size-${props.size}`)
                if (props.iconPosition && props.icon) list.push(`bm-btn-icon-${props.iconPosition}`)
                if (props.fullWidth) list.push(`bm-btn-full-width`)
                return `${list.join(' ')}`
            }

            return {
                getClassList
            }
        }
    }
</script>

<style scoped lang="scss">
    .bm-btn {
        @include button-base();
        @media (max-width: $bp-mobile) {
            width: 100%;
        }
        &-full-width {
            width: 100%;
        }

        &-purple-gradient {
            &-contained {
                @include button-color(
                    $c-purple-gradient-main,
                    'contained',
                    $c-purple-gradient-main
                );
                color: $c-white-500;
                border: none;
                &:hover {
                    box-shadow: $bs-new-light;
                }
                :deep(svg) {
                    path {
                        fill: $c-white-500;
                    }
                }
            }
        }

        &-dark-gray-gradient {
            &-contained {
                @include button-color(
                    $c-dark-gray-gradient-main,
                    'contained',
                    $c-dark-gray-gradient-main
                );
                color: $c-white-500;
                border: none;
                box-shadow: 0 4px 7px -1px rgba(0, 0, 0, 0.11), 0 2px 4px -1px rgba(0, 0, 0, 0.07);
                &:hover {
                }
                :deep(svg) {
                    path {
                        fill: $c-white-500;
                    }
                }
            }
        }

        &-blue-gradient {
            &-contained {
                @include button-color($c-blue-gradient-main, 'contained', $c-blue-gradient-main);
                color: $c-white-500;
                border: none;
                :deep(svg) {
                    path {
                        fill: $c-white-500;
                    }
                }
            }
        }

        &-cyan-dark {
            &-contained {
                @include button-color($c-cyan-dark-300, 'contained', $c-cyan-dark-400);
                color: $c-white-500;
                :deep(svg) {
                    path {
                        fill: $c-white-500;
                    }
                }
            }
            &-outlined {
                @include button-color($c-cyan-dark-500, 'outlined', $c-cyan-dark-50);
                color: $c-cyan-dark-500;
                :deep(svg) {
                    path {
                        fill: $c-green-500;
                    }
                }
            }
            &-text {
                @include button-color($c-green-500, 'text', $c-cyan-dark-400);
                color: $c-green-500;
                :deep(svg) {
                    path {
                        transition: $trans-primary;
                        fill: $c-green-500;
                    }
                }
                &:hover,
                &:active,
                &:focus,
                &:target {
                    :deep(svg) {
                        path {
                            transition: $trans-primary;
                            fill: $c-green-500;
                        }
                    }
                }
            }
        }

        &-orange {
            &-contained {
                @include button-color($c-orange-400, 'contained', $c-orange-500);
                color: $c-black-500;
                :deep(svg) {
                    path {
                        fill: $c-white-500;
                    }
                }
            }
            &-outlined {
                @include button-color($c-orange-500, 'outlined', $c-orange-50);
                color: $c-orange-500;
                :deep(svg) {
                    path {
                        fill: $c-green-500;
                    }
                }
            }
            &-text {
                @include button-color($c-green-500, 'text', $c-orange-400);
                color: $c-green-500;
                :deep(svg) {
                    path {
                        transition: $trans-primary;
                        fill: $c-green-500;
                    }
                }
                &:hover,
                &:active,
                &:focus,
                &:target {
                    :deep(svg) {
                        path {
                            transition: $trans-primary;
                            fill: $c-green-500;
                        }
                    }
                }
            }
        }

        &-purple {
            &-contained {
                @include button-color($c-purple-400, 'contained', $c-purple-500);
                color: $c-white-500;
                :deep(svg) {
                    path {
                        fill: $c-white-500;
                    }
                }
            }
            &-outlined {
                @include button-color($c-purple-500, 'outlined', $c-purple-50);
                color: $c-purple-500;
                :deep(svg) {
                    path {
                        fill: $c-purple-500;
                    }
                }
            }
            &-text {
                @include button-color($c-green-500, 'text', $c-purple-400);
                color: $c-green-500;
                :deep(svg) {
                    path {
                        transition: $trans-primary;
                        fill: $c-green-500;
                    }
                }
                &:hover,
                &:active,
                &:focus,
                &:target {
                    :deep(svg) {
                        path {
                            transition: $trans-primary;
                            fill: $c-green-500;
                        }
                    }
                }
            }
        }
        //yellow
        &-yellow {
            &-contained {
                @include button-color($c-yellow-400, 'contained', $c-yellow-500);
                color: $c-black-500;
                :deep(svg) {
                    path {
                        fill: $c-white-500;
                    }
                }
            }
            &-outlined {
                @include button-color($c-yellow-500, 'outlined', $c-yellow-50);
                color: $c-yellow-500;
                :deep(svg) {
                    path {
                        fill: $c-green-500;
                    }
                }
            }
            &-text {
                @include button-color($c-green-500, 'text', $c-yellow-400);
                color: $c-green-500;
                :deep(svg) {
                    path {
                        transition: $trans-primary;
                        fill: $c-green-500;
                    }
                }
                &:hover,
                &:active,
                &:focus,
                &:target {
                    :deep(svg) {
                        path {
                            transition: $trans-primary;
                            fill: $c-green-500;
                        }
                    }
                }
            }
        }
        &-green {
            &-contained {
                @include button-color($c-green-500, 'contained', $c-green-400);
                color: $c-white-500;
                :deep(svg) {
                    path {
                        fill: $c-white-500;
                    }
                }
            }
            &-outlined {
                @include button-color($c-green-500, 'outlined', $c-green-50);
                color: $c-green-500;
                :deep(svg) {
                    path {
                        fill: $c-green-500;
                    }
                }
            }
            &-text {
                @include button-color($c-green-500, 'text', $c-green-400);
                color: $c-green-500;
                :deep(svg) {
                    path {
                        transition: $trans-primary;
                        fill: $c-green-500;
                    }
                }
                &:hover,
                &:active,
                &:focus,
                &:target {
                    :deep(svg) {
                        path {
                            transition: $trans-primary;
                            fill: $c-green-500;
                        }
                    }
                }
            }
        }
        //blue
        &-blue {
            &-contained {
                @include button-color($c-blue-500, 'contained', $c-blue-500);
                color: $c-white-500;
                :deep(svg) {
                    path {
                        fill: $c-white-500;
                    }
                }
            }
            &-outlined {
                @include button-color($c-blue-500, 'outlined', $c-blue-50);
                color: $c-blue-500;
                :deep(svg) {
                    path {
                        fill: $c-blue-500;
                    }
                }
            }
            &-text {
                @include button-color($c-blue-500, 'text', $c-blue-500);
                color: $c-blue-500;
                :deep(svg) {
                    path {
                        transition: $trans-primary;
                        fill: $c-blue-500;
                    }
                }
                &:hover,
                &:active,
                &:focus,
                &:target {
                    :deep(svg) {
                        path {
                            transition: $trans-primary;
                            fill: $c-blue-500;
                        }
                    }
                }
            }
        }
        //white
        &-white {
            &-outlined {
                @include button-color(
                    $c-white-500,
                    'outlined',
                    $c-white-500
                ); //nie je k tomu dizajn, hover len tipujem
                color: $c-white-500;
                :deep(svg) {
                    path {
                        fill: $c-white-500;
                    }
                }
            }
            &-text {
                @include button-color(
                    $c-white-500,
                    'text',
                    $c-white-500
                ); //nie je k tomu dizajn, hover len tipujem
                color: $c-white-500;
                :deep(svg) {
                    path {
                        transition: $trans-primary;
                        fill: $c-white-500;
                    }
                }
                &:hover,
                &:active,
                &:focus,
                &:target {
                    :deep(svg) {
                        path {
                            transition: $trans-primary;
                            fill: $c-white-500;
                        }
                    }
                }
            }
        }
        //red
        &-red {
            &-contained {
                @include button-color($c-red-500, 'contained', $c-red-500);
                color: $c-white-500;
                :deep(svg) {
                    path {
                        fill: $c-white-500;
                    }
                }
            }
            &-outlined {
                @include button-color($c-red-500, 'outlined', $c-red-50);
                color: $c-red-500;
                :deep(svg) {
                    path {
                        fill: $c-red-500;
                    }
                }
            }
            &-text {
                @include button-color($c-red-500, 'text', $c-red-500);
                color: $c-red-500;
                :deep(svg) {
                    path {
                        transition: $trans-primary;
                        fill: $c-red-500;
                    }
                }
                &:hover,
                &:active,
                &:focus,
                &:target {
                    :deep(svg) {
                        path {
                            transition: $trans-primary;
                            fill: $c-red-500;
                        }
                    }
                }
            }
        }
        //disabled
        &[disabled] {
            &[class*='contained'] {
                @include button-color($c-gray-400, 'contained');
                color: $c-gray-500;
                cursor: initial;
                :deep(svg) {
                    path {
                        fill: $c-gray-500;
                    }
                }
                :deep(.bm-progress-circular) {
                    border: 2px solid $c-gray-300;
                    border-top-color: $c-gray-500;
                }
            }
            &[class*='outlined'] {
                @include button-color($c-gray-400, 'outlined');
                color: $c-gray-500;
                cursor: initial;
                :deep(svg) {
                    path {
                        fill: $c-gray-500;
                    }
                }
                :deep(.bm-progress-circular) {
                    border: 2px solid $c-white-500;
                    border-top-color: $c-gray-500;
                }
            }
            &[class*='text'] {
                @include button-color($c-gray-400, 'text');
                color: $c-gray-500;
                cursor: initial;
                :deep(svg) {
                    path {
                        fill: $c-gray-500;
                    }
                }
                :deep(.bm-progress-circular) {
                    border: 2px solid $c-white-500;
                    border-top-color: $c-gray-500;
                }
            }
        }
        //sizes
        &-size {
            &-sm {
                @include button-size($sm: true);
            }
            &-md {
                @include button-size($md: true);
                &.u-btn-icon-right,
                &.u-btn-icon-left {
                    &:deep(.u-icon) {
                        svg {
                            width: 16px;
                            height: 16px;
                            vertical-align: -0.16em;
                        }
                    }
                    :deep(.u-progress-circular) {
                        width: 16px;
                        height: 16px;
                        vertical-align: -0.16em;
                        border-width: 2px;
                    }
                }
            }
            &-lg {
                @include button-size($lg: true);
                &.u-btn-icon-right,
                &.u-btn-icon-left {
                    &:deep(.u-icon) {
                        svg {
                            width: 16px;
                            height: 16px;
                            vertical-align: -0.06em;
                        }
                    }
                    :deep(.u-progress-circular) {
                        width: 16px;
                        height: 16px;
                        vertical-align: -0.16em;
                        border-width: 2px;
                    }
                }
            }
        }
        //icon
        &-icon {
            &-left {
                :deep(.bm-icon) {
                    line-height: 0;
                    svg {
                    }
                }
            }
            &-right {
                :deep(.bm-icon) {
                    line-height: 0;
                    svg {
                    }
                }
            }
        }
        &-has-loading {
        }
        :deep(.bm-progress-circular) {
            width: 16px;
            height: 16px;
            vertical-align: -0.16em;
            border-width: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .icon-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            &-left {
                margin-right: 8px;
            }
            &-right {
                margin-left: 8px;
            }
        }
    }
</style>
