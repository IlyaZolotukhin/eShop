import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: 'AIzaSyD1u4VDvhbnOQvIlTsJd88GrMb0TTyvo7M',
    appId: '1:1004589233541:web:0185c11193e27aa053c0ec',
    authDomain: 'eshop2-7a876.firebaseapp.com',
    databaseURL: 'https://eshop2-7a876-default-rtdb.firebaseio.com',
    messagingSenderId: '1004589233541',
    projectId: 'eshop2-7a876',
    storageBucket: 'eshop2-7a876.appspot.com',
}

export const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)

export const storage = getStorage(app)

export const auth = getAuth(app)