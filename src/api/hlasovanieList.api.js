// api/hlasovanieList.api.js
import { db } from '@/firebaseConfig'

export const getHlasovaniaList = async () => {
    try {
        const snapshot = await db.ref('hlasovania').once('value')
        const hlasovania = snapshot.val()
        return hlasovania
    } catch (error) {
        throw new Error('Error fetching hlasovania list from Firebase: ' + error.message)
    }
}
