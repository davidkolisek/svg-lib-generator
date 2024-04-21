<template>
    <bm-dialog-footer-content :template-names="['btnSlot1', 'btnSlot2']">
        <template #btnSlot1>
            <bm-button size="md" variant="outlined" color="red" @click="closeDialog">
                Nope
            </bm-button>
        </template>
        <template #btnSlot2>
            <bm-button
                size="md"
                icon-position="left"
                variant="contained"
                color="green"
                @click="handleEmittedEvent"
            >
                Yes
            </bm-button>
        </template>
    </bm-dialog-footer-content>
</template>

<script>
    import BmDialogFooterContent from '@/components/layout/DialogFooterContent.vue'
    import BmButton from '@atoms/Button.vue'

    export default {
        name: 'ExampleFooter',
        components: { BmDialogFooterContent, BmButton },
        emits: ['close', 'emittedEvent'],
        setup(props, { emit }) {
            const closeDialog = () => {
                emit('close')
            }

            const handleEmittedEvent = () => {
                emit('emittedEvent')
            }

            return { closeDialog, handleEmittedEvent }
        }
    }
</script>

<style scoped></style>
