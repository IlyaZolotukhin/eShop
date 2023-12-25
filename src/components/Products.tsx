import React from 'react'
import { useSelector } from 'react-redux'

import ProductCard from '@/components/ProductCard'
import { Grid } from '@mui/material'

import { RootState } from '../store'

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.product.items)

  return (
    <Grid container spacing={2}>
      {items.map(item => (
        <Grid item key={item.id}>
          <ProductCard
            id={item.id}
            key={item.id}
            name={item.name}
            photo={item.photo}
            price={item.price}
            quantity={item.quantity}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default Cart
