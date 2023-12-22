import React from 'react'
import { useSelector } from 'react-redux'

import ProductCard from '@/components/ProductCard'
import { Card, CardContent } from '@mui/material'

import { RootState } from '../store'

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.product.items)

  return (
    <Card>
      <CardContent>
        {items.map(item => (
          <ProductCard
            id={item.id}
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
      </CardContent>
    </Card>
  )
}

export default Cart
