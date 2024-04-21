import { useStore } from 'vuex'
const useFields = () => {
    const store = useStore()

    const updateStore = (mutation, payload) => {
        store.commit(mutation, payload)
    }

    return {
        updateStore
    }
}

export default useFields
