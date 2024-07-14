import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {v4} from 'uuid'
import {storage} from "@/firebase";

interface UploadState {
    loading: boolean
    uploadImg: string
}

const initialState: UploadState = {
    loading: false,
    uploadImg: ''
}

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        onImageUpload: (state, action: PayloadAction<string>) => {
        state.uploadImg = action.payload
    }
    }
})
export const uploadFile = createAsyncThunk('product/upload', async (file: File, thunkAPI) => {
    const { dispatch } = thunkAPI
    dispatch(setLoading(true))

    const imageRef = ref(storage, `images/${file.name + v4()}`)

    try {
        const snapshot = await uploadBytes(imageRef, file)
        const url = await getDownloadURL(snapshot.ref)
        dispatch(setLoading(false))
        dispatch(onImageUpload(url))
    } catch (error) {
        console.error('Error uploading file:', error)
        dispatch(setLoading(false))
    }
})

/*export const uploadFile = (file: File): AppThunk => async (dispatch) => {
    dispatch(setLoading(true))

    const imageRef = ref(storage, `images/${file.name + v4()}`)

    try {
        const snapshot = await uploadBytes(imageRef, file)
        const url = await getDownloadURL(snapshot.ref)
        dispatch(setLoading(false))
        dispatch(onImageUpload(url))
    } catch (error) {
        console.error('Error uploading file:', error)
        dispatch(setLoading(false))
    }
}*/

export const { setLoading,onImageUpload } = uploadSlice.actions
export default uploadSlice.reducer