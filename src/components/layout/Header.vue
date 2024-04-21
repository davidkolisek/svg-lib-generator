<template>
    <bm-box component="header" class="bm-header">
        <bm-container>
            <bm-box class="content-wrapper">
                <bm-box class="content-left"></bm-box>
                <bm-box class="content-middle"></bm-box>
                <bm-box class="content-right">
                    <!--                  <bm-box class="wrapper wrapper-notifications">-->
                    <!--                    <bm-box class="notifications-number">-->
                    <!--                      1-->
                    <!--                    </bm-box>-->
                    <!--                    <bm-icon icon="bell" size="21"/>-->
                    <!--                  </bm-box>-->
                    <bm-box class="wrapper wrapper-menu" @click="handleToggleMenu">
                        <bm-icon icon="ellipsis-vertical" size="21" />
                    </bm-box>
                    <bm-box class="mini-nav" v-if="isOpened">
                        <ul>
                            <li>
                                <bm-button
                                    variant="text"
                                    color="red"
                                    icon="power-off"
                                    icon-position="left"
                                    v-if="isAuth"
                                    @click="logout"
                                    size="small"
                                >
                                    Odhlasit
                                </bm-button>
                            </li>
                        </ul>
                    </bm-box>
                </bm-box>
                <slot />
            </bm-box>
        </bm-container>
    </bm-box>
</template>

<script>
    import useUser from '@/composables/useUser.js'
    import BmBox from '@/components/layout/Box.vue'
    import BmContainer from '@/components/layout/Container.vue'
    import BmButton from '@atoms/Button.vue'
    import { computed, ref } from 'vue'
    import { useStore } from 'vuex'
    import BmIcon from '@atoms/Icon.vue'

    export default {
        name: 'BmHeader',
        components: { BmIcon, BmButton, BmContainer, BmBox },
        setup() {
            const { isAuth } = useUser()
            const store = useStore()
            const userEmail = computed(() => store.getters['auth/getUserEmail'])
            const isOpened = ref(false)

            const logout = async () => {
                await store.dispatch('auth/logout')
                await location.reload()
            }

            const handleToggleMenu = () => {
                isOpened.value = !isOpened.value
            }

            return { isAuth, logout, userEmail, handleToggleMenu, isOpened }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-header {
        position: sticky;
        top: 0;
        background: $c-white-500;
        z-index: 997;
        height: 72px;
        align-items: center;
        display: flex;
        @media (max-width: $bp-tablet) {
            background: $c-white-500;
            box-shadow: $bs-modern-soft;
            height: 64px;
        }
        .content-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .content {
                &-left {
                }
                &-middle {
                }
                &-right {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    position: relative;
                }
            }
        }
        .wrapper {
            cursor: pointer;
            background: $c-white-400;
            border-radius: $br-semi-small;
            height: 48px;
            width: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 16px;
            transition: $trans-primary;
            &:deep(.bm-icon) {
                display: flex;
                svg {
                    path {
                        transition: $trans-primary;
                        fill: $c-gray-300;
                    }
                }
            }
            &:hover {
                transition: $trans-primary;
                background: $c-gray-200;
                &:deep(.bm-icon) {
                    transition: $trans-primary;
                    svg {
                        path {
                            fill: $c-white-500;
                        }
                    }
                }
            }
            &-menu {
            }
            &-notifications {
                position: relative;
                .notifications-number {
                    position: absolute;
                    top: -4px;
                    right: -4px;
                    background: $c-red-500;
                    color: $c-white-500;
                    padding: 0 5px;
                    border-radius: $br-semi-small;
                    height: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 12px;
                    font-weight: 600;
                    min-width: 20px;
                }
            }
        }
        .mini-nav {
            background: $c-white-500;
            border-radius: $br-semi-small;
            box-shadow: $bs-modern-soft;
            padding: 16px;
            position: absolute;
            top: 56px;
            right: 0;
            ul {
                margin: 0;
                padding: 0;
                list-style-type: none;
                li {
                }
            }
        }
    }
</style>
