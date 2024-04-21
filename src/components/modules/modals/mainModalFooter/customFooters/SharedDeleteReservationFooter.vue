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
                @click="confirm"
            >
                Yes
            </bm-button>
            {{ reservationData }}
        </template>
    </bm-dialog-footer-content>
</template>

<script>
    import BmDialogFooterContent from '@/components/layout/DialogFooterContent.vue'
    import BmButton from '@atoms/Button.vue'
    import { computed } from 'vue'
    import { useStore } from 'vuex'

    export default {
        name: 'SharedDeleteReservationFooter',
        components: { BmDialogFooterContent, BmButton },
        emits: ['close', 'confirm'], // Update emitted event name
        props: {
            reservationData: {
                type: Object,
                required: true
            },
            // eslint-disable-next-line vue/require-default-prop
            handleSubmit: {
                type: Function,
                required: false
            }
        },
        setup(props, { emit }) {
            const store = useStore()

            const parkingLotId = computed(() => store.getters['company/getCompanyParkingLot'])

            const handleDeleteReservation = async () => {
                await store.dispatch('reservations/deleteReservation', {
                    reservationId: props.reservationData.reservation.id,
                    parkingSpotId: props.reservationData.reservation.parkingSpot,
                    date: props.reservationData.reservation.date,
                    timePeriod: props.reservationData.reservation.timePeriod,
                    parkingLotId: parkingLotId.value
                })
                // setTimeout(() => {
                //     location.reload()
                // }, 1000)
            }
            const closeDialog = () => {
                emit('close')
            }

            const confirm = () => {
                handleDeleteReservation(props.reservationData)
                emit('confirm') // Emit 'confirmDelete' event
            }

            return { closeDialog, confirm }
        }
    }
</script>

<style scoped></style>
