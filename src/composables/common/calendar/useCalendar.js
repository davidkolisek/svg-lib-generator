import { useStore } from 'vuex'
import { computed } from 'vue'
const useCalendar = () => {
    const store = useStore()

    const calendarParkingEventsShared = function () {
        const spotsAvailability = computed(() => store.getters['calendar/getSpotsAvailability'])
        const parkingLot = computed(() => store.getters['parkingLot/getParkingLot'])
        const numOfParkingSpots = parkingLot.value.length
        const userReservations = computed(() => store.getters['reservations/getUserReservations'])
        const sortedSpotsAvailability = {}

        // Initialize events for all dates and parking spots
        spotsAvailability.value.forEach((item) => {
            const { date, parkingSpotId, morning, afternoon } = item

            if (!sortedSpotsAvailability[date]) {
                sortedSpotsAvailability[date] = {}
            }
            if (!sortedSpotsAvailability[date][parkingSpotId]) {
                sortedSpotsAvailability[date][parkingSpotId] = {
                    morning: morning ? morning : false,
                    afternoon: afternoon ? afternoon : false,
                    allDay: morning && afternoon ? true : false
                }
            }
        })

        // Create events based on the availability object and number of parking spots
        const calendarEvents = []

        for (const date in sortedSpotsAvailability) {
            const dateAvailability = sortedSpotsAvailability[date]
            const usedParkingSpots = Object.keys(dateAvailability).length

            // Check if all parking spots have morning and afternoon set to true
            const isMorningFull = Object.values(dateAvailability).every(
                (spot) => spot.morning === true
            )
            const isAfternoonFull = Object.values(dateAvailability).every(
                (spot) => spot.afternoon === true
            )

            const morningStatus = isMorningFull ? true : false
            const afternoonStatus = isAfternoonFull ? true : false

            const event = {
                date,
                className: ['reservation-event'],
                availabilityFlag: ['available']
            }

            if (morningStatus && afternoonStatus) {
                event.className.push('allday-full')
                event.availabilityFlag.push('allday-full')
            } else if (morningStatus) {
                event.className.push('morning-full')
                event.availabilityFlag.push('morning-full')
            } else if (afternoonStatus) {
                event.className.push('afternoon-full')
                event.availabilityFlag.push('afternoon-full')
            }

            for (const item of userReservations.value) {
                const event = {
                    date: item.date, // Extract the date property from the object
                    className: ['reservation-event', 'reserved-day-shared-full']
                }

                calendarEvents.push(event)
            }

            calendarEvents.push(event)
        }
        store.commit('calendar/SET_AVAILABILITY_FOR_DATES', calendarEvents)

        return calendarEvents
    }

    const calendarParkingEventsDedicated = function () {
        const canceledReservationsDedicated = computed(
            () => store.getters['calendar/getCanceledReservationsDedicated']
        )

        // Create events based on the availability object and number of parking spots
        const calendarEvents = []

        for (const item of canceledReservationsDedicated.value) {
            const event = {
                date: item.date, // Extract the date property from the object
                className: ['reservation-event', 'allDay-canceled']
            }

            calendarEvents.push(event)
        }
        return calendarEvents
    }

    let findParentWithDateAttr = (element) => {
        let currentElement = element

        while (currentElement) {
            if (currentElement.hasAttribute('data-date')) {
                return currentElement
            }
            currentElement = currentElement.parentElement
        }

        return null // No parent with data-date attribute found
    }

    return {
        calendarParkingEventsShared,
        calendarParkingEventsDedicated,
        findParentWithDateAttr
    }
}

export default useCalendar
