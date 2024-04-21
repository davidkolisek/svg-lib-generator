<template>
    <bm-box
        component="div"
        :class="
            isOpen
                ? 'bm-right-aside-nav opened-right-aside'
                : 'bm-right-aside-nav closed-right-aside'
        "
    >
        <bm-box class="aside-nav-box">
            <bm-box class="aside-right-nav aside-right-nav-header-wrapper">
                <bm-typography component="h3">
                    {{ title }}
                </bm-typography>
                <bm-typography component="p" variant="caption">
                    {{ perex }}
                </bm-typography>
            </bm-box>
            <bm-box class="aside-right-nav aside-right-nav-content-wrapper">
                <slot />
            </bm-box>
            <bm-box class="aside-right-nav aside-right-nav-action-wrapper">
                <bm-button @click="handleClose" variant="contained" color="green">Ok!</bm-button>
            </bm-box>
            <bm-box class="close-aside">
                <bm-icon icon="xmark" @click="handleClose" />
            </bm-box>
        </bm-box>
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmTypography from '@atoms/Typography.vue'
    import BmButton from '@atoms/Button.vue'
    import BmIcon from '@atoms/Icon.vue'
    export default {
        name: 'BmRightAsideNav',
        components: { BmButton, BmIcon, BmTypography, BmBox },
        props: {
            title: {
                type: String,
                default: 'Title'
            },
            perex: {
                type: String,
                default: 'Perex'
            },
            isOpen: {
                type: Boolean,
                default: false
            }
        },
        emits: ['close'],
        setup(props, { emit }) {
            const handleClose = () => {
                emit('close') // Emit an event to notify the parent component to close the aside
            }

            return { handleClose }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-right-aside-nav {
        &.opened-right-aside {
            display: flex;
            &:before {
                display: block;
            }
            .aside-nav-box {
                z-index: 998;
                right: 0;
            }
        }
        &.closed-right-aside {
            min-width: 0;
            transition: $trans-basic;
            &:before {
                display: none;
            }
            .aside-nav-box {
                z-index: 998;
                right: -325px;
                transition: $trans-basic;
            }
        }

        &:before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.2);
            width: 100%;
            height: 100%;
            transition: $trans-basic;
            display: none;
            z-index: 998;
        }

        .aside-nav-box {
            position: absolute;
            min-width: 300px;
            max-width: 300px;
            top: 0;
            height: 100%;
            bottom: 0;
            background: $c-white-500;
            transition: $trans-basic;
            display: flex;
            flex-direction: column;
            .aside-right-nav {
                padding: 16px;
                &-header-wrapper {
                }
                &-content-wrapper {
                    height: 100%;
                }
                &-action-wrapper {
                }
            }
        }

        &:before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.2);
            width: 100%;
            height: 100%;
            transition: $trans-basic;
            display: none;
        }
        .close-aside {
            position: absolute;
            width: 40px;
            height: 40px;
            background: #f2f4f7;
            border-radius: $br-circle;
            left: -20px;
            top: 110px;
            cursor: pointer;
            transition: $trans-basic;
            &:deep(.bm-icon) {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                transition: $trans-basic;
                svg {
                    transition: $trans-basic;
                    width: 18px;
                    height: 18px;
                    path {
                        fill: $c-black-500;
                    }
                }
            }
            &:hover {
                box-shadow: $bs-soft;
                transition: $trans-basic;
                background: $c-purple-500;
                &:deep(.bm-icon) {
                    svg {
                        path {
                            transition: $trans-basic;
                            fill: $c-white-500;
                        }
                    }
                }
            }
        }
    }
</style>
