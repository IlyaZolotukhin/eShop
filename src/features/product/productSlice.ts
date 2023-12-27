import { db } from '@/main'
import { AppThunk } from '@/store'
import { createSlice } from '@reduxjs/toolkit'
import { get, ref } from 'firebase/database'

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
    setItems: (state, action) => {
      state.items = action.payload
    },
  },
})

export const { setItems } = productSlice.actions
export default productSlice.reducer

export const fetchProducts = (): AppThunk => async dispatch => {
  try {
    const dataRef = ref(db, 'items')
    const snapshot = await get(dataRef)

    if (snapshot.exists()) {
      const items = snapshot.val()

      dispatch(setItems(items))
    }
  } catch (error) {
    console.log(error)
  }
}
