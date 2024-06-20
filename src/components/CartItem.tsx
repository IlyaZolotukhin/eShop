import React from 'react'
import {useDispatch} from 'react-redux'

import {decreaseItem, increaseItem, removeItem} from '@/features/cart/cartSlice'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveIcon from '@mui/icons-material/Remove'
import {Button, Card, CardContent, CardMedia, Typography} from '@mui/material'

interface CartItemProps {
  id: string
  name: string
  photo: string
  price: number
  quantity: number
}

const CartItem: React.FC<CartItemProps> = ({ id, name, photo, price, quantity }) => {
  const dispatch = useDispatch()

  const handleRemoveFromCart = () => {
    dispatch(removeItem(id))
      localStorage.clear()
  }

  const handleDecreaseItem = () => {
    if (quantity > 1) {
      dispatch(decreaseItem(id))
    } else {
      dispatch(removeItem(id))
      localStorage.clear()
    }
  }

  const handleIncreaseItem = () => {
    dispatch(increaseItem(id))
  }

  return (
    <Card>
      <CardContent>
        <Typography component={'div'} variant={'h5'}>
          {name}
        </Typography>
        <CardMedia alt={name} component={'img'} image={photo} style={{ height: 100, width: 100 }} />
        <Typography color={'text.secondary'} variant={'body1'}>
          Price: ${price}
        </Typography>
        <Typography color={'text.secondary'} variant={'body1'}>
          <Button onClick={handleRemoveFromCart} variant={'outlined'}>
            <DeleteIcon />
          </Button>
          <Button onClick={handleDecreaseItem} variant={'text'}>
            <RemoveIcon />
          </Button>
          {quantity}
          <Button onClick={handleIncreaseItem} variant={'text'}>
            <AddIcon />
          </Button>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CartItem
