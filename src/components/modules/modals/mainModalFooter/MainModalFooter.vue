<template>
    <shared-delete-reservation-footer
        v-if="type.type === 'sharedDeleteReservation'"
        @close="handleClose"
        @confirm="confirm"
        :reservation-data="type"
    />
</template>

<script>
    import SharedDeleteReservationFooter from '@modules/modals/mainModalFooter/customFooters/SharedDeleteReservationFooter.vue'
    export default {
        name: 'BmDialogFooter',
        props: {
            type: {
                type: String,
                default: ''
            },
            handleSubmit: {
                type: Function,
                default: () => {}
            }
        },
        components: { SharedDeleteReservationFooter },
        emits: ['close', 'confirm'],
        setup(props, { emit }) {
            const handleClose = () => {
                emit('close')
            }
            const confirm = () => {
                props.handleSubmit()
            }
            return {
                handleClose,
                confirm
            }
        }
    }
</script>

<style scoped></style>
