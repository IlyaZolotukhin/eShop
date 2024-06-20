import { useDispatch } from 'react-redux'

import { ThunkAction, UnknownAction, configureStore } from '@reduxjs/toolkit'

import cartReducer from './features/cart/cartSlice'
import productReducer from './features/product/productSlice'
import uploadReducer from './features/product/uploadSlice'
import authReducer from './features/auth/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    upload: uploadReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, UnknownAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
