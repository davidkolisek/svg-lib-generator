import { useStore } from 'vuex'
const useStep = () => {
    const store = useStore()
    const setStepCompanySetup = (newStep) => {
        store.dispatch('setupStepper/setStep', newStep)
    }
    const isCompanySetupCurrentStep = (step) => {
        return store.getters['setupStepper/getActualStep'] === step
    }
    return {
        setStepCompanySetup,
        isCompanySetupCurrentStep
    }
}

export default useStep
