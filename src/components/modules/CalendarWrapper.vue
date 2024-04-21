<template>
    <div class="bm-calendar-box">
        <bm-box class="info-slot">
            <slot name="infoSlot" />
        </bm-box>
        <bm-box class="calendar-slot">
            <slot name="calendarSlot" />
        </bm-box>
    </div>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    export default {
        name: 'BmCalendarWrapper',
        components: {
            BmBox
        },
        props: {},
        setup() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    .bm-calendar-box {
        box-shadow: $bs-modern-soft;
        display: flex;
        flex-direction: row;
        border-radius: $br-large;
        background: $c-white-500;
        @media (max-width: $bp-tablet) {
            flex-direction: column;
            border-radius: $br-semi-small;
        }
        .info-slot {
            padding: 24px;
            flex: 1 1 30%;
            background: $c-purple-300;
            border-top-left-radius: $br-large;
            border-bottom-left-radius: $br-large;
            @media (max-width: $bp-tablet) {
                order: 2;
                padding: 16px;
                border-top-left-radius: 0;
                border-bottom-right-radius: $br-semi-small;
                border-bottom-left-radius: $br-semi-small;
            }
        }
        .calendar-slot {
            padding: 24px;
            flex: 1 1 70%;
            @media (max-width: $bp-tablet) {
                order: 1;
                padding: 8px;
            }
        }
    }
</style>
