import React from 'react'
import { useDispatch } from 'react-redux'

import { Button, Card, CardContent, Typography } from '@mui/material'

import { addItem } from '../features/cart/cartSlice'

interface ProductCardProps {
  id: number
  name: string
  price: number
  quantity: number
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, quantity }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addItem({ id, name, price, quantity }))
  }

  return (
    <Card>
      <CardContent>
        <Typography component={'div'} variant={'h5'}>
          {name}
        </Typography>
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
