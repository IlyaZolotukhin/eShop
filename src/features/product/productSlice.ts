import { createSlice } from '@reduxjs/toolkit'

interface ProductState {
  items: { id: number; name: string; photo: string; price: number; quantity: number }[]
}

const initialState: ProductState = {
  items: [],
}

const productSlice = createSlice({
  initialState,
  name: 'product',
  reducers: {
    addItems: (state, action) => {
      state.items.push(action.payload)
    },
  },
})

export const { addItems } = productSlice.actions
export default productSlice.reducer
