import React from 'react'
import { useSelector } from 'react-redux'

import { Button, Card, CardContent, Typography } from '@mui/material'

import { RootState } from '../store'

const Checkout: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items)

  const handlePlaceOrder = () => {
    // Handle order placement logic here
  }

  return (
    <Card>
      <CardContent>
        <Typography component={'div'} variant={'h5'}>
          Checkout
        </Typography>
        {items.map(item => (
          <div key={item.id}>
            <Typography component={'div'} variant={'body1'}>
              {item.name} - ${item.price}
            </Typography>
          </div>
        ))}
        <Button onClick={handlePlaceOrder} variant={'contained'}>
          Place Order
        </Button>
      </CardContent>
    </Card>
  )
}

export default Checkout
