import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/store'
import { Button, Card, CardContent, Typography } from '@mui/material'

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
        <img
          alt={photo}
          loading={'lazy'}
          src={`${photo}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${photo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          style={{ height: 300, width: 300 }}
        />
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
