import { createSlice } from '@reduxjs/toolkit'

export interface CartState {
  items: { id: number; name: string; price: number }[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload)
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
  },
})

export const { addItem, removeItem } = cartSlice.actions
export default cartSlice.reducer
