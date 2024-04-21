// imageUploader.js
import { storage } from '@/firebaseConfig'
import Compressor from 'compressorjs'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const compressImage = (file) => {
    return new Promise((resolve) => {
        new Compressor(file, {
            quality: 0.4,
            success: (compressedResult) => {
                resolve(compressedResult)
            }
        })
    })
}

const uploadFile = async (file, docId) => {
    const storageRef = ref(storage, docId + '/' + file.name)
    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL
}

export const uploadImages = async (documentId) => {
    const base64Images = JSON.parse(localStorage.getItem('selectedImages'))
    const uploadedImageURLs = []

    if (!Array.isArray(base64Images)) {
        console.error('Invalid or empty base64Images array in localStorage')
        return uploadedImageURLs
    }

    for (let index = 0; index < base64Images.length; index++) {
        const base64Image = base64Images[index]
        const byteCharacters = atob(base64Image.split(',')[1])
        const byteArrays = []

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512)
            const byteNumbers = new Array(slice.length)

            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i)
            }

            const byteArray = new Uint8Array(byteNumbers)
            byteArrays.push(byteArray)
        }

        // Generate a unique file name with an index
        const fileName = `image_${documentId}_${index}.png`
        const fileType = 'image/png'

        const file = new File(byteArrays, fileName, { type: fileType })
        const compressedFile = await compressImage(file)
        const downloadURL = await uploadFile(compressedFile, documentId)
        uploadedImageURLs.push(downloadURL)
    }

    return uploadedImageURLs
}
