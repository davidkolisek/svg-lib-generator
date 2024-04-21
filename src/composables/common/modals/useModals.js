import { inject } from 'vue'
const useModals = () => {
    const emitter = inject('emitter') // Inject `emitter`
    const modalAreYouSure = (type) => {
        if (type === undefined) type = 'areYouSure'
        emitter.emit('open-modal', { type: type, customFooter: true })
    }

    return {
        modalAreYouSure
    }
}

export default useModals
