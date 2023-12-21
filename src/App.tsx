import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'

import Error404 from '@/components/Error/Error404'
import Products from '@/components/Products'
import { AppBar, Button, Container, Grid, Toolbar, Typography } from '@mui/material'

import Cart from './components/Cart'
import Checkout from './components/Checkout'
import { RootState } from './store'

const App: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items)
  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <>
      <AppBar position={'static'}>
        <Toolbar>
          <Typography component={'div'} sx={{ flexGrow: 1 }} variant={'h6'}>
            My Shop
          </Typography>
          <Button color={'inherit'} component={Link} to={'/'}>
            Home
          </Button>
          <Button color={'inherit'} component={Link} to={'/cart'}>
            Cart
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
      <Container sx={{ marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Routes>
              <Route element={<Products />} path={'/'} />
              <Route element={<Cart />} path={'/cart'} />
              <Route element={<Checkout />} path={'/checkout'} />
              <Route element={<Error404 />} path={'*'} />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default App
