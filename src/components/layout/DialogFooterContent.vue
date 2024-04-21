<template>
    <bm-box
        display="flex"
        flex-direction="row"
        :justify-content="{ xs: 'center', md: 'flex-end' }"
        full-width
    >
        <bm-box
            v-for="templateName in templateNames"
            :key="templateName"
            class="dialog-footer-template"
        >
            <slot :name="templateName" />
        </bm-box>
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'

    export default {
        name: 'BmDialogFooterContent',
        components: { BmBox },
        props: {
            // definujem name pre jednotlive sloty
            templateNames: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style lang="scss">
    .dialog-footer-template {
        margin: 0 4px;
        flex: 1;
        @media (min-width: $bp-mobile) {
            margin: 0 8px;
            flex: unset;
        }
        &:first-child {
            margin-left: 0;
        }
        &:last-child {
            margin-right: 0;
        }
    }
</style>
