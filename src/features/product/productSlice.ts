import { db } from '@/main'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, push, ref } from 'firebase/database'

export interface ProductState {
  items: { id: number; name: string; photo: string; price: number; quantity: number }[]
}

const initialState: ProductState = {
  items: [],
}

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const dataRef = ref(db, 'items')
  const snapshot = await get(dataRef)

  if (snapshot.exists()) {
    return snapshot.val()
  }

  return []
})

export const sendDataToFirebase = createAsyncThunk('product/sendDataToFirebase', async data => {
  try {
    await push(ref(db, 'items'), data)
    console.log('Data sent successfully')
  } catch (error) {
    console.error('Error sending data:', error)
  }
})

const productSlice = createSlice({
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload
    })
  },
  initialState,
  name: 'product',
  reducers: {
    setItems: (
      state,
      action: PayloadAction<
        { id: number; name: string; photo: string; price: number; quantity: number }[]
      >
    ) => {
      state.items = action.payload
    },
  },
})

export const { setItems } = productSlice.actions
export default productSlice.reducer
