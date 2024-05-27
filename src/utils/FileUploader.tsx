import React, {useState} from 'react'
import {CircularProgress, TextField} from '@mui/material'
import {useAppDispatch} from "@/store";
import {uploadFile} from "@/features/product/uploadSlice";

export const FileUploader: React.FC = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)


  const loadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLoading(true)
      dispatch(uploadFile(e.target.files[0])).then(() => setLoading(false))
    }
  }

  return (
      <>
        <TextField onChange={loadFile} type={'file'} />
        {loading && <CircularProgress />}
      </>
  )
}
