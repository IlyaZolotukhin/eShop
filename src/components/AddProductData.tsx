import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import {RootState, useAppDispatch} from '@/store'
import { FileUploader } from '@/utils/FileUploader'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { v4 } from 'uuid'

import { addProduct } from '../features/product/productSlice'
import {useSelector} from "react-redux";

const AddProductData = () => {
  const uploadImg = useSelector((state: RootState) => state.upload.uploadImg)
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productQuantity, setProductQuantity] = useState('')

  const handleChangeName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductName(e.currentTarget.value)
  }

  const handleChangePrice = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductPrice(e.currentTarget.value)
  }

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductQuantity(e.currentTarget.value)
  }

  const dispatch = useAppDispatch()

  const productId = v4()
  const sendProductData = () => {
    const items = {
      id: productId,
      name: productName,
      photo: uploadImg,
      price: +productPrice,
      quantity: +productQuantity,
    }

    dispatch(addProduct(items))
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography component={'div'} sx={{ flexGrow: 1 }} variant={'h6'}>
            Add product
          </Typography>
          <Typography component={'div'} sx={{ flexGrow: 1 }} variant={'h6'}>
            Name product: <TextField onChange={handleChangeName} />
          </Typography>
          <Typography component={'div'} sx={{ flexGrow: 1 }} variant={'h6'}>
            Price product: <TextField onChange={handleChangePrice} />
          </Typography>
          <Typography component={'div'} sx={{ flexGrow: 1 }} variant={'h6'}>
            Quantity product: <TextField onChange={handleChangeQuantity} />
          </Typography>
          <Typography component={'div'} sx={{ flexGrow: 1 }} variant={'h6'}>
            Image product: <FileUploader />
          </Typography>
          <Button component={Link} onClick={sendProductData} to={'/'} variant={'contained'}>
            Add product
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

export default AddProductData
