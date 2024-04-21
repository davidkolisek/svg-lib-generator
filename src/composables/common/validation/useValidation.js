const useValidation = () => {
    const phone = (value) => {
        if (!value && value.length > 0) {
            return true // If it's empty, it's okay (handled by required rule)
        }
        // Check if the first 3 characters are "420" or "421"
        const first3Characters = value.substring(0, 3)
        if (first3Characters === '420' || first3Characters === '421') {
            return value.length === 12 // Check the total length
        }

        return false // If the first 3 characters are not "420" or "421"
    }

    const email = (value) => {
        if (value && value.length > 0) {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            return emailRegex.test(value)
        }
        return true // If it's empty, it's okay (handled by required rule)
    }

    const password = (value) => {
        if (value && value.length > 0) {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
            return passwordRegex.test(value)
        }
        return true // If it's empty, it's okay (handled by required rule)
    }

    const companyName = (value) => {
        if (!value) {
            return true
        }
        return value.length < 70 && value.length >= 2
    }

    const isTrue = (value) => {
        return value === true
    }

    const createMaxCharsValidator = (max) => {
        return (value) => {
            if (!value) {
                return true
            }
            return value.length <= max
        }
    }

    const createMinCharsValidator = (min) => {
        return (value) => {
            if (!value) {
                return true
            }
            return value.length >= min
        }
    }

    const passwordMatch = (password, confirmPassword) => {
        return password === confirmPassword
    }

    const validate = async (vuelidateObject) => {
        return await vuelidateObject.$validate()
    }

    return {
        phone,
        email,
        companyName,
        createMaxCharsValidator,
        isTrue,
        password,
        createMinCharsValidator,
        passwordMatch,
        validate
    }
}

export default useValidation
