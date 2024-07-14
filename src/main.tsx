import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './firebase'
import store from '@/store'
import { createRoot } from 'react-dom/client'

import App from './App'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter basename={'/eShop/'}>
      <App />
    </BrowserRouter>
  </Provider>
)
