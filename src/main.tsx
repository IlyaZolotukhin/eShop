import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import store from '@/store'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { createRoot } from 'react-dom/client'

import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import App from './App'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD1u4VDvhbnOQvIlTsJd88GrMb0TTyvo7M',
  appId: '1:1004589233541:web:0185c11193e27aa053c0ec',
  authDomain: 'eshop2-7a876.firebaseapp.com',
  databaseURL: 'https://eshop2-7a876-default-rtdb.firebaseio.com',
  messagingSenderId: '1004589233541',
  projectId: 'eshop2-7a876',
  storageBucket: 'eshop2-7a876.appspot.com',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
