<template>
    <bm-typography component="p" v-if="type === 'custom'">
        {{ customText }}
    </bm-typography>
    <bm-typography
        component="p"
        v-if="type === 'custom-html'"
        :translate-html="customText"
    ></bm-typography>
    <bm-typography
        v-if="type !== 'custom' && type !== 'summaryGlobal' && type !== 'custom-html'"
        :translate-html="$trans('nrsr-hlasovanie.modal.' + type)"
        component="p"
    />
</template>

<script>
    import BmTypography from '@atoms/Typography.vue'
    export default {
        name: 'BmDialogContent',
        components: {
            BmTypography
        },
        props: {
            type: {
                type: String,
                default: ''
            },
            customText: {
                type: String,
                default: ''
            }
        },
        setup() {
            return {}
        }
    }
</script>

<style scoped lang="scss"></style>
