import React from 'react'
import { useSelector } from 'react-redux'

import { Card, CardContent, Typography } from '@mui/material'

import { RootState } from '../store'
import CartItem from './CartItem'

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items)
  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <Card>
      <CardContent>
        {items.length > 0 ? (
          <Typography component={'div'} variant={'h5'}>
            Cart
          </Typography>
        ) : (
          <Typography component={'div'} variant={'h5'}>
            Cart is empty
          </Typography>
        )}

        {items.map(item => (
          <CartItem id={item.id} key={item.id} name={item.name} price={item.price} />
        ))}
        <Typography color={'text.secondary'} variant={'body1'}>
          Total: ${total}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Cart
