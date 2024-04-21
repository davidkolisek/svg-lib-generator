import { isTimestamp } from '@/helpers/helpers.js'
import { constants } from '@/helpers/constants.js'

const useFormatting = () => {
    const formatPhone = (phoneNumber) => {
        if (phoneNumber && phoneNumber.length >= 9) {
            return phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
        }
        return phoneNumber // Return the original phoneNumber if it doesn't meet the length requirement
    }

    const formatPersonalId = (personalId) => {
        if (personalId && personalId.length >= 9) {
            // Insert a slash after the 6th character
            return personalId.slice(0, 6) + '/' + personalId.slice(6)
        }
        return personalId // Return the original personalId if it doesn't meet the length requirement
    }

    const formatDate = (value) => {
        if (value instanceof Date || isTimestamp(value)) {
            return new Date(value).toLocaleDateString()
        }
    }

    const formatZip = (zip) => {
        if (zip && zip.length >= 5) {
            return zip.replace(/(\d{3})(\d{2})/, '$1 $2')
        }
        return zip
    }

    // i want to show only 2 decimal places and add eur currency at the end
    const formatFinance = (finance) => {
        if (finance === null || finance === undefined) {
            return finance
        }
        const formattedValue = finance.toFixed(2) // Limit to 2 decimal places
        return `${formattedValue} €` // Add EUR currency symbol
    }
    const formatUnitValueToLabel = (value) => {
        const units = constants.UNITS
        return units.find((unit) => unit.value === value).label
    }
    const formatProductStatusToLabel = (value) => {
        const units = constants.PRODUCT_STATUS
        return units.find((unit) => unit.value === value).label
    }

    return {
        formatPhone,
        formatPersonalId,
        formatFinance,
        formatDate,
        formatZip,
        formatUnitValueToLabel,
        formatProductStatusToLabel
    }
}

export default useFormatting
