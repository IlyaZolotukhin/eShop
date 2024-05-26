import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch } from '@/store'
import { FileUploader } from '@/utils/FileUploader'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { v4 } from 'uuid'

import { addProduct } from '../features/product/productSlice'

const AddProductData = () => {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productQuantity, setProductQuantity] = useState('')
  const [imageUrls, setImageUrls] = useState<string>('')

  const handleChangeName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductName(e.currentTarget.value)
  }

  const handleChangePrice = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductPrice(e.currentTarget.value)
  }

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductQuantity(e.currentTarget.value)
  }

  const handleImageUpload = (url: string) => {
    setImageUrls(url)
  }

  const dispatch = useAppDispatch()
  //добавить инпут для ввода характеристик товара
  const productId = v4()
  const sendProductData = () => {
    const items = {
      id: productId,
      name: productName,
      photo: imageUrls,
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
            Image product: <FileUploader onImageUpload={handleImageUpload} />
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
