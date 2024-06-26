import { createSlice } from '@reduxjs/toolkit'

export type CartState = {
  items: { id: string; name: string; photo: string; price: number; quantity: number }[]
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addItem: (state, action) => {
      action.payload.quantity = 1
      state.items.push(action.payload)
    },
    decreaseItem: (state, action) => {
      const itemToIncrease = state.items.find(item => item.id === action.payload)

      if (itemToIncrease) {
        itemToIncrease.quantity -= 1
      }
    },
    deleteCart: state => {
      state.items = []
    },
    increaseItem: (state, action) => {
      const itemToIncrease = state.items.find(item => item.id === action.payload)

      if (itemToIncrease) {
        itemToIncrease.quantity += 1
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    setCart: (state, action) => {
      state.items = action.payload
    },
  },
})

export const { addItem, decreaseItem, deleteCart, increaseItem, removeItem, setCart } =
  cartSlice.actions
export default cartSlice.reducer
