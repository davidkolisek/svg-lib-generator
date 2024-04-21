<template>
    <bm-app-layout>
        <bm-main>
            <router-view></router-view>
        </bm-main>
        <main-modal />
        <bm-alert-message />
    </bm-app-layout>
</template>

<script>
    import MainModal from '@modules/modals/MainModal.vue'
    import BmAppLayout from '@/components/layout/AppLayout.vue'
    import BmMain from '@/components/layout/Main.vue'
    import LoadingOverlay from '@modules/LoadingOverlay.vue'
    import { useI18n } from 'vue-i18n'
    import BmAlertMessage from '@atoms/AlertMessage.vue'

    export default {
        components: {
            BmAlertMessage,
            LoadingOverlay,
            BmMain,
            BmAppLayout,
            MainModal
        },
        setup() {
            const { t } = useI18n({ useScope: 'global' })
            return {
                t
            }
        }
    }
</script>

<style lang="scss">
    * {
        box-sizing: border-box;
    }

    html,
    body {
    }

    body {
        font-family: $f-primary;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -webkit-tap-highlight-color: transparent;
        -webkit-text-size-adjust: 100%;
        background: $sidenav-bg;
    }

    body,
    html,
    #app {
        height: 100%;
        width: 100%;
    }

    body {
        &.bm-dialog-opened {
            overflow: hidden;
        }
    }
    a {
        color: #059669;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
</style>
