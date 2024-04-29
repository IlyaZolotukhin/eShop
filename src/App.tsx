import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'

import CreditCardForm from '@/components/CreditCardForm/CreditCardForm'
import Error404 from '@/components/Error/Error404'
import Products from '@/components/Products'
import { setCart } from '@/features/cart/cartSlice'
import HomeIcon from '@mui/icons-material/Home'
import PaymentIcon from '@mui/icons-material/Payment'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppBar, Button, Container, Toolbar, Tooltip, Typography } from '@mui/material'

import s from './App.module.scss'

import Cart from './components/Cart'
import Checkout from './components/Checkout'
import { fetchProducts } from './features/product/productSlice'
import { RootState, useAppDispatch } from './store'

const App: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems')

    if (savedCartItems) {
      dispatch(setCart(JSON.parse(savedCartItems)))
    }
  }, [dispatch])

  return (
    <>
      <AppBar position={'fixed'}>
        <Toolbar>
          <Typography component={'div'} sx={{ flexGrow: 1 }} variant={'h6'}>
            My Shop
          </Typography>
          <Button color={'inherit'} component={Link} to={'/'}>
            <Tooltip title={'to shopping'}>
              <HomeIcon />
            </Tooltip>
          </Button>
          <Button color={'inherit'} component={Link} to={'/checkout'}>
            <Tooltip title={'pay for the order'}>
              <PaymentIcon />
            </Tooltip>
          </Button>
          <Button color={'inherit'} component={Link} to={'/cart'}>
            <Tooltip title={'go to cart'}>
              <ShoppingCartIcon />
            </Tooltip>
          </Button>
          {total ? (
            <Typography color={'text.secondary'} component={'div'} variant={'h6'}>
              Total: ${total}
            </Typography>
          ) : (
            ''
          )}
        </Toolbar>
      </AppBar>
      <Container className={s.container}>
        <Routes>
          <Route element={<Products />} path={'/'} />
          <Route element={<Cart />} path={'/cart'} />
          <Route element={<Checkout />} path={'/checkout'} />
          <Route element={<CreditCardForm />} path={'/payment'} />
          <Route element={<Error404 />} path={'*'} />
        </Routes>
      </Container>
    </>
  )
}

export default App
