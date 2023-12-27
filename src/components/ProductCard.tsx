import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/store'
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material'

import { addItem, increaseItem } from '../features/cart/cartSlice'

interface ProductCardProps {
  id: number
  name: string
  photo: string
  price: number
  quantity: number
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, photo, price, quantity }) => {
  const dispatch = useDispatch()
  const itemInCart = useSelector((state: RootState) =>
    state.cart.items.find(item => item.id === id)
  )

  const handleAddToCart = () => {
    if (!itemInCart) {
      dispatch(addItem({ id, name, photo, price, quantity }))
    } else {
      dispatch(increaseItem(id))
    }
  }

  return (
    <Card sx={{ marginTop: 2 }}>
      <CardContent>
        <Typography component={'div'} variant={'h5'}>
          {name}
        </Typography>
        <CardMedia alt={name} component={'img'} height={'300'} image={photo} />
        <Typography color={'text.secondary'} variant={'body1'}>
          Price: ${price}
        </Typography>
        <Button onClick={handleAddToCart} variant={'contained'}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProductCard
