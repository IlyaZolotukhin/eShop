import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'

import CreditCardForm from '@/components/CreditCardForm'
import Error404 from '@/components/Error/Error404'
import Products from '@/components/Products'
import { addItems } from '@/features/product/productSlice'
import { db } from '@/main'
import HomeIcon from '@mui/icons-material/Home'
import PaymentIcon from '@mui/icons-material/Payment'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppBar, Button, Container, Toolbar, Tooltip, Typography } from '@mui/material'
import { get, ref } from 'firebase/database'

import Cart from './components/Cart'
import Checkout from './components/Checkout'
import { RootState } from './store'

const App: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const dispatch = useDispatch()

  useEffect(() => {
    const dataRef = ref(db, 'items')

    get(dataRef).then(snapshot => {
      if (snapshot.exists()) {
        const items = snapshot.val()

        dispatch(addItems(items))
      }
    })
  }, [])

  return (
    <>
      <AppBar position={'static'}>
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
      <Container fixed style={{ margin: '20px' }}>
        <Routes>
          <Route element={<Products />} path={'/'} />
          <Route element={<Cart />} path={'/cart'} />
          <Route element={<Checkout />} path={'/checkout'} />
          <Route
            element={
              <CreditCardForm
                onSubmit={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
            }
            path={'/payment'}
          />
          <Route element={<Error404 />} path={'*'} />
        </Routes>
      </Container>
    </>
  )
}

export default App
