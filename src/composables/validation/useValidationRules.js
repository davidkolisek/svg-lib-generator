const useValidationRules = () => {
    const validationRuleOne = () => {
        return true // musi vratit true alebo false
    }

    const phoneNumber = (value) => {
        if (!value) {
            return true // ak je prazdny tak je to ok, na to je required rule
        }
        return value.length === 9
    }

    const zip = (value) => {
        if (!value) {
            return true
        }
        return value.length === 5
    }

    const ico = (value) => {
        if (!value) {
            return true
        }
        return value.length === 8
    }

    const rodCislo = (value) => {
        if (!value) {
            return true
        }
        return value.length === 10
    }

    return {
        validationRuleOne,
        phoneNumber,
        zip,
        ico,
        rodCislo
    }
}

export default useValidationRules
