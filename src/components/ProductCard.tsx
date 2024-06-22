import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addItem, increaseItem } from '@/features/cart/cartSlice'
import { RootState } from '@/store'
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material'

interface ProductCardProps {
  id: string
  name: string
  photo: string
  price: number
  quantity: number
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, photo, price, quantity }) => {
  const dispatch = useDispatch()
  const itemInCart = useSelector((state: RootState) =>
    state.cart.items.find(item => item.id === id)
  )
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    if(quantity === 0) setAvailable(true)
  }, [quantity])

  const handleAddToCart = () => {
    if (!itemInCart) {
      dispatch(addItem({ id, name, photo, price, quantity }))
    } else {
      dispatch(increaseItem(id))
    }
  }

  return (
    <Card sx={{ marginTop: 2 }}>
      <CardContent>
        <Typography component={'div'} variant={'h5'}>
          {name}
        </Typography>
        <CardMedia style={available ? {opacity:0.5}:{}} alt={name} component={'img'} height={'250'} image={photo} />
        {available ? <Typography style={{display: 'flex',justifyContent:'center',position:'relative', bottom:'140px'}} component={'div'} variant={'h5'}>Not available
        </Typography>:<Typography component={'div'} variant={'h5'}>
        </Typography>}
        {available ? <Typography variant={'body1'}>
        </Typography> : <Typography color={'text.secondary'} variant={'body1'}>
          Price: ${price}
        </Typography>}
        <Button disabled={available} onClick={handleAddToCart} variant={'contained'}>
          Add to Cart
        </Button>

      </CardContent>
    </Card>
  )
}

export default ProductCard
