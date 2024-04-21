export const isTimestamp = (value) => {
    return typeof value === 'number' && value.toString().length > 11
}

export const removeIdFromString = (value) => {
    const firstHyphenIndex = value.indexOf('-')
    if (firstHyphenIndex !== -1) {
        return value.substring(firstHyphenIndex + 1)
    } else {
        return value // If there is no '-', return the original value
    }
}

export const formatName = (name) => {
    const parts = name.split(',').map((part) => part.trim())
    return parts.reverse().join(' ')
}
