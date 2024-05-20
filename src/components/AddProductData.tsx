import { Link } from 'react-router-dom'

import { useAppDispatch } from '@/store'
import { Button, Card, CardContent, Typography } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

import { addProduct } from '../features/product/productSlice'

const AddProductData = () => {
  const dispatch = useAppDispatch()

  const productId = uuidv4()
  const sendProductData = () => {
    const items = {
      id: productId,
      name: 'TV',
      photo:
        'https://static.ru-mi.com/upload/resize_cache/iblock/9e4/440_440_1/ivzxm4nxe17ij2mycnh8p66hc3iw98bo.jpg',
      price: 100,
      quantity: 1,
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
          <Button component={Link} onClick={sendProductData} to={'/'} variant={'contained'}>
            Add product
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

export default AddProductData
