import React from 'react'
import { useDispatch } from 'react-redux'

import { Button, Card, CardContent, Typography } from '@mui/material'

import { removeItem } from '../features/cart/cartSlice'

interface CartItemProps {
  id: number
  name: string
  price: number
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price }) => {
  const dispatch = useDispatch()

  const handleRemoveFromCart = () => {
    dispatch(removeItem(id))
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
        <Button onClick={handleRemoveFromCart} variant={'contained'}>
          Remove from Cart
        </Button>
      </CardContent>
    </Card>
  )
}

export default CartItem
