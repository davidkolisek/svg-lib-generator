<template>
    <bm-box class="ticket">
        <bm-box class="ticket__header">
            <bm-box class="icon-wrapper" text-align="center">
                <bm-icon icon="parking-lot" size="36" color="#c7b2ff" />
            </bm-box>
            <bm-typography component="h2" variant="h4" text-align="center">
                Reservation ticket
            </bm-typography>
        </bm-box>
        <bm-box class="ticket__content">
            <bm-label-text-item direction="horizontal" label="Date" :value="date" />
            <bm-label-text-item direction="horizontal" label="Time" :value="computedTimePeriod" />
            <bm-label-text-item
                direction="horizontal"
                label="Spot"
                :value="removeIdFromString(parkingSpot)"
            />
        </bm-box>
        <bm-box class="ticket__footer">
            <slot name="ticketAction" />
        </bm-box>
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmTypography from '@atoms/Typography.vue'
    import BmIcon from '@atoms/Icon.vue'
    import { removeIdFromString } from '@/helpers/helpers'
    import BmLabelTextItem from '@atoms/LabelTextItem.vue'
    import { computed } from 'vue'
    import { constants } from '@/helpers/constants'

    export default {
        name: 'ReservationTicket',
        components: { BmLabelTextItem, BmIcon, BmTypography, BmBox },
        props: {
            date: {
                type: String,
                required: true
            },
            parkingSpot: {
                type: String,
                required: true
            },
            timePeriod: {
                type: String,
                required: true
            }
        },
        setup(props) {
            const computedTimePeriod = computed(() => {
                if (props.timePeriod === constants.RESERVATION_TIME.ALLDAY) {
                    return 'All day (00-24)'
                } else if (props.timePeriod === constants.RESERVATION_TIME.MORNING) {
                    return 'Morning (00-12)'
                } else if (props.timePeriod === constants.RESERVATION_TIME.AFTERNOON) {
                    return 'Morning (12-24)'
                } else {
                    return 'Invalid time period'
                }
            })

            return {
                removeIdFromString,
                computedTimePeriod
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ticket {
        box-shadow: $bs-softy;
        background: $c-white-500;
        border-radius: $br-semi-small;
        padding: 12px;
        &__header {
            padding: 12px 24px 12px;
            border: 1px solid $c-purple-50;
            border-bottom: none;
            border-radius: $br-semi-small $br-semi-small 0 0;
            position: relative;

            &:after {
                content: '';
                width: calc(100% - 30px);
                position: absolute;
                bottom: 0;
                left: 15px;
                height: 1px;
                background: $c-purple-50;
            }
        }

        &__content {
            background: $c-white-500;
            padding: 12px 24px 0;
            border: 1px solid $c-purple-50;
            border-bottom: none;
            border-top: none;
        }

        &__footer {
            background: $c-white-500;
            padding: 24px 24px 24px;
            border: 1px solid $c-purple-50;
            border-top: none;
            border-radius: 0 0 $br-semi-small $br-semi-small;
            position: relative;

            &:after {
                content: '';
                width: calc(100% - 30px);
                position: absolute;
                top: 0;
                left: 15px;
                height: 1px;
                background: $c-purple-50;
            }
        }
    }
</style>
