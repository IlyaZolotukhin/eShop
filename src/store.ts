import { useDispatch } from 'react-redux'

import { ThunkAction, UnknownAction, configureStore } from '@reduxjs/toolkit'

import cartReducer from './features/cart/cartSlice'
import productReducer from './features/product/productSlice'
import uploadReducer from './features/product/uploadSlice'

const store = configureStore({
  reducer: {
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
