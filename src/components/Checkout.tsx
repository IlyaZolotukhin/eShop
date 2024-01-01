import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Button, Card, CardContent, Typography } from '@mui/material'

import { RootState } from '../store'

const Checkout: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handlePlaceOrder = () => {}

  return (
    <Card>
      <CardContent>
        <Typography component={'div'} variant={'h5'}>
          Checkout
        </Typography>
        {items.map(item => (
          <div key={item.id}>
            <Typography component={'div'} variant={'body1'}>
              {item.name} - {item.quantity}pcs. - ${item.price}
            </Typography>
          </div>
        ))}
        <Typography color={'div'} style={{ margin: '20px 0' }} variant={'h5'}>
          <Button
            component={Link}
            disabled={total === 0}
            onClick={handlePlaceOrder}
            style={{ margin: '0 10px 0 0' }}
            to={'/payment'}
            variant={'contained'}
          >
            Place Order
          </Button>
          Total: ${total}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Checkout
