import React, { useState } from 'react'

import { storage } from '@/main'
import { TextField } from '@mui/material'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'

type FileUploaderProps = {
  onImageUpload: (urls: string) => void
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onImageUpload }) => {
  const [imageUpload, setImageUpload] = useState<File | null>(null)

  const uploadFile = () => {
    if (imageUpload == null) {
      return
    }
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)

    uploadBytes(imageRef, imageUpload).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        onImageUpload(url)
      })
    })
  }

  const loadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageUpload(e.target.files[0])
    }
  }

  return (
    <>
      <TextField onChange={loadFile} type={'file'} />
      <button onClick={uploadFile}>Upload Image</button>
    </>
  )
}
