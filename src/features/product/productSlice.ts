import { createSlice } from '@reduxjs/toolkit'

interface ProductState {
  items: { id: number; name: string; price: number; quantity: number }[]
}

const initialState: ProductState = {
  items: [
    { id: 1, name: 'Mobile phone', price: 100, quantity: 1 },
    { id: 2, name: 'TV', price: 200, quantity: 1 },
    { id: 3, name: 'vacuum cleaner', price: 150, quantity: 1 },
  ],
}

const productSlice = createSlice({
  initialState,
  name: 'product',
  reducers: {},
})

export const {} = productSlice.actions
export default productSlice.reducer
