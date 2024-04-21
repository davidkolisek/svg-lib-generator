import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '@/firebaseConfig'
const useFirestore = () => {
    const updateDocumentData = async (collection, payload) => {
        try {
            const documentDoc = doc(firestore, collection, payload.docId)
            await updateDoc(documentDoc, payload.docData)
            return Promise.resolve(`Document ${payload.docId} updated`)
        } catch (error) {
            console.error(error)
            return Promise.reject(error)
        }
    }
    return {
        updateDocumentData
    }
}

export default useFirestore
