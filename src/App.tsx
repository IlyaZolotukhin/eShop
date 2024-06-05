import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link, Route, Routes, useNavigate} from 'react-router-dom'

import AddProduct from '@/components/AddProductData'
import CreditCardForm from '@/components/CreditCardForm/CreditCardForm'
import Error404 from '@/components/Error/Error404'
import Products from '@/components/Products'
import {setCart} from '@/features/cart/cartSlice'
import AddHomeIcon from '@mui/icons-material/AddHome'
import HomeIcon from '@mui/icons-material/Home'
import PaymentIcon from '@mui/icons-material/Payment'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import PercentIcon from '@mui/icons-material/Percent';
import s from './App.module.scss'
import PersonIcon from '@mui/icons-material/Person'
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import {fetchProducts} from './features/product/productSlice'
import {RootState, useAppDispatch} from './store'
import {AccountCircle} from "@mui/icons-material"

const App: React.FC = () => {
    /*const [auth, setAuth] = React.useState(true);*/
    const auth = true
    const [anchorMenuEl, setAnchorMenuEl] = React.useState<null | HTMLElement>(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const items = useSelector((state: RootState) => state.cart.items)
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const quantity = items.reduce((sum, item) => sum + item.quantity, 0)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    useEffect(() => {
        const savedCartItems = localStorage.getItem('cartItems')

        if (savedCartItems) {
            dispatch(setCart(JSON.parse(savedCartItems)))
        }
    }, [dispatch])

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorMenuEl(event.currentTarget);
    };
    const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorMenuEl(null);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleToHome = () => {
        navigate('/')
        setAnchorMenuEl(null);
    }
    const handleAddProduct = () => {
        navigate('/add')
        setAnchorEl(null);
    }
    const handleToCart = () => {
        navigate('/cart')
        setAnchorEl(null);
    }
    const handleToPay = () => {
        navigate('/checkout')
        setAnchorEl(null);
    }

    return (
        <Box sx={{flexGrow: 2}}>
            <AppBar position="fixed">
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorMenuEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorMenuEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleToHome}><HomeIcon/> Home</MenuItem>
                            <MenuItem onClick={handleToHome}><PercentIcon/> Promotional code</MenuItem>
                            <MenuItem onClick={handleToHome}><ArticleIcon/> News</MenuItem>
                            <MenuItem onClick={handleToHome}><InfoIcon/> About</MenuItem>
                        </Menu>

                        <Typography color="inherit" style={{width: '0px', textDecoration: 'none'}} variant="h6"
                                    component={Link} to={'/'} sx={{flexGrow: 1}}>
                            My Shop
                        </Typography>
                    </div>

                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                component={Link} to={'/cart'}
                                style={{padding: '0'}}
                                color="inherit"
                            >
                                <ShoppingCartIcon/>{quantity ? <Typography
                                style={{position: 'relative', right: '16px', bottom: '6px', fontWeight: 'bold'}}
                                color={'red'} component={'span'} variant={'body2'}>{quantity}
                            </Typography>: ''}
                            </IconButton>
                            {total ? (
                                <Typography color={'text.secondary'} component={'span'} variant={'h6'}>${total}
                                </Typography>
                            ) : (
                                ''
                            )}
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="user-appbar"
                                aria-haspopup="true"
                                onClick={handleUserMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="user-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}><PersonIcon/> Profile</MenuItem>
                                <MenuItem onClick={handleAddProduct}><AddHomeIcon/> Add product</MenuItem>
                                <MenuItem onClick={handleToCart}><ShoppingCartIcon/>{quantity ? <Typography
                                    style={{position: 'relative', right: '16px', bottom: '6px', fontWeight: 'bold'}}
                                    color={'red'} component={'span'} variant={'body2'}>{quantity}
                                </Typography>:''} Cart</MenuItem>
                                <MenuItem onClick={handleToPay}><PaymentIcon/> Pay for the order</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Container className={s.container}>
                <Routes>
                    <Route element={<Products/>} path={'/'}/>
                    <Route element={<AddProduct/>} path={'/add'}/>
                    <Route element={<Cart/>} path={'/cart'}/>
                    <Route element={<Checkout/>} path={'/checkout'}/>
                    <Route element={<CreditCardForm/>} path={'/payment'}/>
                    <Route element={<Error404/>} path={'*'}/>
                </Routes>
            </Container>
        </Box>
    );
}

export default App
