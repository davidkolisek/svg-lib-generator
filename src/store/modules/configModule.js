import { constants } from '@/helpers/constants'

const configModule = {
    namespaced: true,
    state: {
        location: 'sk',
        isLoading: true
    },
    mutations: {
        SET_IS_LOADING(state, payload) {
            state.isLoading = payload
        },
        SET_LOCATION(state, payload) {
            state.location = payload
        },
        SET_ALERT_MESSAGE(state, payload) {
            state.helpers.alert = payload
        },
        SET_IS_SUBMITTED(state, payload) {
            state.isSubmitted = payload
        }
    },
    actions: {
        setAlertMessage({ commit }, payload) {
            commit('SET_ALERT_MESSAGE', payload)
        }
    },
    getters: {
        getIsLoading(state) {
            return state.isLoading
        },
        getRoles(state) {
            return state.roles
        },
        getReservationTimePeriods(state) {
            return state.reservationTimePeriods
        },
        getLocation(state) {
            return state.location
        },
        getAlertMessage(state) {
            return state.helpers.alert
        },
        getIsSubmitted(state) {
            return state.isSubmitted
        }
    }
}

export default configModule
