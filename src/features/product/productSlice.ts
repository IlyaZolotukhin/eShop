import { db } from '@/main'
import { createAppAsyncThunk } from '@/utils/create-app-async-thunk'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, push, ref } from 'firebase/database'

export interface ProductState {
  items: { id: string; name: string; photo: string; price: number; quantity: number }[]
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

export const addProduct = createAppAsyncThunk(
  'product/addProduct',
  async (item: { id: string; name: string; photo: string; price: number; quantity: number }) => {
    try {
      await push(ref(db, 'items'), item)
      console.log('Data sent successfully')

      // Получаем обновленные данные после добавления продукта
      const dataRef = ref(db, 'items')
      const snapshot = await get(dataRef)

      if (snapshot.exists()) {
        return snapshot.val()
      }

      return []
    } catch (error) {
      console.error('Error sending data:', error)

      return [] // Возвращаем пустой массив в случае ошибки
    }
  }
)

const productSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items = action.payload
      })
  },
  initialState,
  name: 'product',
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload)
    },
    setItems: (
      state,
      action: PayloadAction<
        { id: string; name: string; photo: string; price: number; quantity: number }[]
      >
    ) => {
      state.items = action.payload
    },
  },
})

export const { addItem, setItems } = productSlice.actions
export default productSlice.reducer
