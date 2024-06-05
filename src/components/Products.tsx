import React from 'react'
import { useSelector } from 'react-redux'

import ProductCard from '@/components/ProductCard'
import { Grid } from '@mui/material'

import { RootState } from '../store'

const Products: React.FC = () => {
  const items = useSelector((state: RootState) => state.product.items)

  const products = Object.values(items)

  return (
    <Grid container spacing={2} justifyContent={"center"} >
      {products.map(product => (
        <Grid width={'300px'} item key={product.id}>
          <ProductCard
            id={product.id}
            key={product.id}
            name={product.name}
            photo={product.photo}
            price={product.price}
            quantity={product.quantity}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default Products
