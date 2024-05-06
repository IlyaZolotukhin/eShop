import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { sendProduct } from '@/features/product/productSlice'
import { Button, Card, CardContent, Typography } from '@mui/material'

const AddProductData = () => {
  const dispatch = useDispatch()

  const sendProductData = () => {
    const data = {
      id: 22,
      name: 'TV',
      photo:
        'https://static.ru-mi.com/upload/resize_cache/iblock/9e4/440_440_1/ivzxm4nxe17ij2mycnh8p66hc3iw98bo.jpg',
      price: 100,
      quantity: 3,
    }

    dispatch(sendProduct(data))
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
