<template>
    <bm-box component="div" class="bm-sidenav opened">
        <bm-box class="bm-sidenav-inner">
            <bm-box class="toggle-sidenav-btn" @click="handleToggleSidenav">
                <bm-icon icon="chevron-left" v-if="!isMobile()" />
                <bm-icon icon="hamburger" v-if="isMobile()" />
            </bm-box>
            <bm-box class="sidenav-logo-wrapper">
                <bm-typography component="p" variant="h2" color="purple">
                    nrsr-hlasovanie
                </bm-typography>
            </bm-box>
            <bm-box class="sidenav-navigation-wrapper">
                <ul v-if="isAdmin && isCompanySetupFinished">
                    <li v-for="adminNavItem in adminNav" :key="adminNavItem.name">
                        <router-link :to="{ name: adminNavItem.route }">
                            <bm-icon class="nav-item-icon" :icon="adminNavItem.icon" />
                            <bm-box component="span" class="nav-item-text">
                                {{ adminNavItem.name }}
                            </bm-box>
                        </router-link>
                    </li>
                </ul>
                <ul v-else-if="isUser">
                    <li v-for="userNavItem in userNav" :key="userNavItem.name">
                        <router-link :to="{ name: userNavItem.route }">
                            <bm-icon class="nav-item-icon" :icon="userNavItem.icon" />
                            <bm-box component="span" class="nav-item-text">
                                {{ userNavItem.name }}
                            </bm-box>
                        </router-link>
                    </li>
                </ul>
            </bm-box>
            <bm-box class="sidenav-user-wrapper" @click="goToProfile">
                <bm-person-initials
                    :name="userEmail ? userEmail : ''"
                    :sub-name="userRole ? userRole : ''"
                />
            </bm-box>
        </bm-box>
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    import useUser from '@/composables/useUser'
    import { useStore } from 'vuex'
    import { computed } from 'vue'
    import BmTypography from '@atoms/Typography.vue'
    import BmIcon from '@atoms/Icon.vue'
    import BmPersonInitials from '@atoms/PersonInitials.vue'
    import useTranslation from '@/composables/common/translations/useTranslation'
    import useWindow from '@/composables/common/window/useWindow'
    import { useRouter } from 'vue-router'

    export default {
        name: 'SidenavSection',
        components: { BmPersonInitials, BmIcon, BmTypography, BmBox },
        setup() {
            const { translate } = useTranslation()
            const { isAuth } = useUser()
            const store = useStore()
            const router = useRouter()
            const isAdmin = computed(() => store.getters['auth/isAdmin'])
            const isUser = computed(() => store.getters['auth/isUser'])
            const userEmail = computed(() => store.getters['auth/getUserEmail'])
            const userRole = computed(() => store.getters['auth/getUserRole'])
            const companyName = computed(() => store.getters['company/getCompanyName'])

            const isCompanySetupFinished = computed(() => {
                // Check if companyName is not undefined, not empty, and not null
                return (
                    companyName.value !== undefined &&
                    companyName.value !== '' &&
                    companyName.value !== null
                )
            })

            const { isMobile } = useWindow()

            const handleToggleSidenav = () => {
                const sidenav = document.querySelector('.bm-sidenav')
                sidenav.classList.toggle('opened')
                sidenav.classList.toggle('icon-hidden')
            }

            const goToProfile = () => {
                router.push({ name: isAdmin.value ? 'AdminProfileView' : 'ProfileView' })
            }

            const userNav = [
                {
                    name: 'Dashboard',
                    route: 'DashboardView',
                    icon: 'dashboard'
                },
                {
                    name: 'Parking lot',
                    route: 'ParkingLotView',
                    icon: 'parking-lot'
                }
            ]
            const adminNav = [
                {
                    name: translate('nrsr-hlasovanie.sidenav.admin.dashboard'),
                    route: 'AdminDashboardView',
                    icon: 'dashboard'
                },
                {
                    name: translate('nrsr-hlasovanie.sidenav.admin.parkingLot'),
                    route: 'AdminParkingLotView',
                    icon: 'parking-lot'
                },
                {
                    name: 'Reservations',
                    route: 'AdminReservationsView',
                    icon: 'calendar'
                },
                {
                    name: translate('nrsr-hlasovanie.sidenav.admin.users'),
                    route: 'AdminUsersView',
                    icon: 'users'
                },
                {
                    name: translate('nrsr-hlasovanie.sidenav.admin.settings'),
                    route: 'AdminSettingsView',
                    icon: 'settings'
                }
            ]

            return {
                isAuth,
                isUser,
                isAdmin,
                userNav,
                adminNav,
                handleToggleSidenav,
                userEmail,
                userRole,
                isMobile,
                goToProfile,
                isCompanySetupFinished
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-sidenav {
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        width: 80px;
        transition: width 0.3s; /* Add this transition property */
        @media (max-width: $bp-tablet) {
            position: fixed;
            z-index: 999;
            right: 0;
            bottom: 0;
            left: 0;
            flex-direction: row;
            height: auto;
            width: 100%;
        }
        &-inner {
            background: $c-white-500;
            display: flex;
            flex-direction: column;
            height: 100%;
            z-index: 1000;
            position: relative;
            @media (max-width: $bp-tablet) {
                flex-direction: row;
                width: 100%;
                height: auto;
            }
        }
        &.icon-hidden {
            @media (max-width: $bp-tablet) {
                left: -100%;
            }
            .toggle-sidenav-btn {
                &:deep(.bm-icon) {
                    transform: scaleX(-1);
                }
            }
            .sidenav {
                &-logo-wrapper {
                    opacity: 0;
                }
                &-navigation-wrapper {
                    padding: 90px 8px 0;
                    ul {
                        li {
                            a {
                                justify-content: center;
                                align-items: center;
                                padding: 16px 8px;
                                .nav-item-text {
                                    display: none;
                                }
                                &:deep(.bm-icon) {
                                    padding-right: 0;
                                }
                                &.router-link-active {
                                    padding: 16px 8px;
                                }
                            }
                        }
                    }
                }
                &-user-wrapper {
                    &:deep(.bm-person-initials) {
                        .fullname {
                            display: none;
                        }
                    }
                }
            }
        }
        .toggle-sidenav-btn {
            position: absolute;
            width: 40px;
            height: 40px;
            background: $c-dark-gray-gradient-main;
            border-radius: $br-circle;
            right: -20px;
            bottom: 110px;
            cursor: pointer;
            transition: $trans-basic;
            @media (max-width: $bp-tablet) {
                display: none;
            }
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
                        fill: $c-white-500;
                    }
                }
            }
            &:hover {
                box-shadow: $bs-soft;
                transition: $trans-basic;
                opacity: 0.9;
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

        &.opened {
            width: 300px;
            @media (max-width: $bp-tablet) {
                width: 100%;
            }
        }
        .sidenav {
            &-logo-wrapper {
                padding: 36px 16px 0;
                @media (max-width: $bp-tablet) {
                    display: none;
                }
            }
            &-navigation-wrapper {
                padding: 90px 16px 0;
                @media (max-width: $bp-tablet) {
                    padding: 16px;
                    width: 100%;

                    box-shadow: $bs-modern-soft;
                }
                @media (max-width: $bp-tablet) {
                    padding: 8px;
                }
                ul {
                    margin: 0;
                    padding: 0;
                    list-style-type: none;
                    @media (max-width: $bp-tablet) {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-around;
                    }
                    li {
                        margin-bottom: 16px;
                        @media (max-width: $bp-tablet) {
                            margin-bottom: 0;
                            margin-right: 16px;
                            &:last-child {
                                margin-right: 0;
                            }
                        }
                        @media (max-width: $bp-mobile) {
                            margin-right: 4px;
                        }
                        a {
                            color: $c-gray-500;
                            text-decoration: none;
                            font-size: 1rem;
                            font-family: $f-secondary;
                            display: flex;
                            flex-direction: row;
                            font-weight: 600;
                            padding: 16px 16px;
                            border-radius: $br-semi-small;
                            transition: $trans-basic;
                            @media (max-width: $bp-tablet) {
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                padding: 8px 8px;
                                font-size: 0.8rem;
                            }
                            @media (max-width: $bp-mobile) {
                                font-size: 0.7rem;
                            }
                            &:hover {
                                transition: $trans-basic;
                                color: $c-black-400;
                                &:deep(.bm-icon) {
                                    svg {
                                        path {
                                            transition: $trans-basic;
                                            fill: $c-black-400;
                                        }
                                    }
                                }
                            }
                            &:deep(.bm-icon) {
                                display: flex;
                                padding-right: 12px;
                                transition: $trans-basic;
                                @media (max-width: $bp-tablet) {
                                    padding: 0 0 4px;
                                }
                                svg {
                                    width: 24px;
                                    height: 24px;
                                    @media (max-width: $bp-tablet) {
                                        width: 21px;
                                        height: 21px;
                                    }
                                    @media (max-width: $bp-mobile) {
                                        width: 18px;
                                        height: 18px;
                                        font-size: 0.7rem;
                                    }
                                    path {
                                        transition: $trans-basic;
                                        fill: $c-gray-500;
                                    }
                                }
                            }
                            .nav-item-text {
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }

                            &.router-link-active {
                                color: $c-white-500;
                                background: $c-purple-gradient-main;
                                transition: $trans-basic;
                                padding: 16px 16px 16px 32px;
                                box-shadow: $bs-modern-soft;
                                @media (max-width: $bp-tablet) {
                                    padding: 8px 8px;
                                    color: $c-purple-400;
                                    background: transparent;
                                    box-shadow: none;
                                }
                                &:deep(.bm-icon) {
                                    svg {
                                        path {
                                            transition: $trans-basic;
                                            fill: $c-white-500;
                                            @media (max-width: $bp-tablet) {
                                                fill: $c-purple-400;
                                            }
                                        }
                                    }
                                }
                                &:hover {
                                    padding: 16px 16px 16px 24px;
                                    @media (max-width: $bp-tablet) {
                                        padding: 8px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            &-user-wrapper {
                padding: 16px 16px 16px 20px;
                margin-top: auto;
                border-top: 1px solid $c-gray-50;
                @media (max-width: $bp-tablet) {
                    display: none;
                }
            }
        }
    }
</style>
