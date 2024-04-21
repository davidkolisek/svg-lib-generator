import { getCurrentInstance } from 'vue'

const useTranslation = () => {
    const { appContext } = getCurrentInstance()
    const translate = (key) => {
        return appContext.config.globalProperties.$trans(key)
    }
    return {
        translate
    }
}

export default useTranslation
