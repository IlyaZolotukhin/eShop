import React from 'react'
import { useDispatch } from 'react-redux'

import { removeItem } from '@/features/cart/cartSlice'
import { Button, Card, CardContent, Typography } from '@mui/material'

interface CartItemProps {
  id: number
  name: string
  price: number
  quantity: number
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, quantity }) => {
  const dispatch = useDispatch()

  const handleRemoveFromCart = () => {
    dispatch(removeItem(id))
  }

  const handleDecreaseItem = () => {
    /* setCount(count--)*/
  }

  const handleIncreaseItem = () => {
    /* setCount(count++)*/
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
        <Typography color={'text.secondary'} variant={'body1'}>
          <Button onClick={handleRemoveFromCart} variant={'contained'}>
            delete
          </Button>
          <Button onClick={handleDecreaseItem} variant={'contained'}>
            -
          </Button>
          {quantity}
          <Button onClick={handleIncreaseItem} variant={'contained'}>
            +
          </Button>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CartItem
