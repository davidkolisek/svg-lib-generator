<template>
    <div class="bm-calendar">
        <FullCalendar :options="calendarOptions" @click="handleEventClick" />
    </div>
</template>

<script>
    import { ref } from 'vue'
    import FullCalendar from '@fullcalendar/vue3'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import interactionPlugin from '@fullcalendar/interaction'
    import enLocale from '@fullcalendar/core/locales/en-gb'
    import skLocate from '@fullcalendar/core/locales/sk'

    export default {
        name: 'BmFullCalendar',
        components: {
            FullCalendar
        },
        props: {
            options: {
                type: Object,
                required: true
            }
        },
        setup(props) {
            const clickedDate = ref(null)
            const calendarOptions = ref({
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                firstDay: 1, // Set Monday as the first day
                locales: [enLocale, skLocate],
                locale: 'en', // the initial locale. if not specified, uses the first one
                events: [
                    // Your event data goes here
                    // Example:
                    { title: 'Event 1', date: '2023-10-05' },
                    { title: 'Event 2', date: '2023-10-10' }
                ],
                ...props.options
            })

            const handleEventClick = (info) => {
                // Remove the class from the previously clicked day (if any)
                if (clickedDate.value) {
                    clickedDate.value.classList.remove('fc-day-clicked')
                }

                // Add the class to the newly clicked day
                info.target.classList.add('fc-day-clicked')

                // Update the clickedDate ref to the newly clicked day
                clickedDate.value = info.target
            }

            return {
                calendarOptions,
                handleEventClick
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bm-calendar {
        &:deep(.fc) {
            //highlighted
            .fc-highlight {
                background: transparent;
                opacity: 0.7;
            }
            //top header
            .fc-header-toolbar {
                h2 {
                    font-size: 1rem;
                }
                .fc-today-button {
                    display: none;
                }
                .fc-button-group {
                    .fc-button {
                        background: $c-yellow-500;
                        opacity: 1;
                        border: none;
                        .fc-icon {
                            color: $c-black-500;
                        }
                        &:first-child {
                            margin-right: 8px;
                        }
                    }
                }
            }
            .fc-theme-standard td {
            }
            .fc-scrollgrid-liquid {
                border: none;
                thead {
                    tr {
                        th {
                            border: none;
                        }
                    }
                }
                tbody {
                    tr {
                        td {
                            border: none;
                        }
                    }
                }
            }
            //header
            .fc-scrollgrid-section-header {
                border: none;
                th.fc-col-header-cell {
                    border: none;
                }
            }
            //vsetky dni
            td.fc-day {
                padding: 6px;
                box-sizing: content-box;
                border: none;
                @media (max-width: $bp-tablet) {
                    padding: 3px;
                }
                &-disabled {
                    background: $c-white-500;
                    .fc-daygrid-day-frame {
                        background: $c-gray-50;
                    }
                }
                //inner
                &.fc-day-today {
                    background: transparent;
                    .fc-daygrid-day-frame {
                        opacity: 0.6;
                    }
                }
                .fc-daygrid-day-frame {
                    border-radius: $br-semi-small;
                    width: 100%;
                    //day text
                    .fc-daygrid-day-top {
                        color: $c-white-500;
                        font-size: 1.25rem;
                        font-family: $f-secondary;
                        font-weight: 600;
                        height: 100%;
                        @media (max-width: $bp-tablet) {
                            font-size: 1rem;
                            justify-content: center;
                        }
                        .fc-daygrid-day-number {
                            padding: 8px;
                            position: unset;
                            @media (max-width: $bp-tablet) {
                                padding: 4px;
                            }
                        }
                        .fc-day-clicked {
                            &:before {
                                background: $c-green-500;
                                opacity: 0.7;
                                position: absolute;
                                content: '';
                                inset: 0;
                                z-index: -1;
                            }
                        }
                    }
                }
                .fc-daygrid-day-events {
                    display: none;
                }
            }
            //moje upravy dni podla eventov
            .reservation-day-td-shared {
                position: relative;
                .fc-daygrid-day-frame {
                    background: $c-green-300;
                    overflow: hidden;
                    &:before,
                    &:after {
                        content: '';
                        position: absolute;
                        height: 100%;
                    }
                }

                &.morning-full-td {
                    .fc-daygrid-day-frame {
                        &:before {
                            width: 50%;
                            top: 0;
                            left: 0;
                            bottom: 0;
                            background-color: $c-red-500;
                        }
                    }
                }
                &.allday-full-td {
                    .fc-daygrid-day-frame {
                        &:after {
                            width: 100%;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            left: 0;
                            background-color: $c-red-500;
                        }
                    }
                }
                &.afternoon-full-td {
                    .fc-daygrid-day-frame {
                        &:after {
                            width: 50%;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            background-color: $c-red-500;
                        }
                    }
                }
                //rezervacka
                &.reserved-day-shared-full-td {
                    .fc-daygrid-day-frame {
                        &:before {
                            z-index: 2;
                            width: 100%;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            background-color: $c-purple-200;
                        }
                    }
                }
            }
        }
        :deep(.reservation-day-td-dedicated) {
            background: #7028ff;
            position: relative;
            &.allDay-canceled-td {
                &:after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background-color: #cb2eff;
                }
            }
        }
        :deep(.reservation-event) {
            background-color: green;
            z-index: -1;
            position: relative;
        }
    }
</style>
