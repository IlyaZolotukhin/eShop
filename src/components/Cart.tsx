import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import {RootState} from '@/store'
import {Button, Card, CardContent, Typography} from '@mui/material'

import CartItem from './CartItem'

const Cart: React.FC = () => {
    const items = useSelector((state: RootState) => state.cart.items)
    const auth = useSelector((state: RootState) => state.auth.isAuthenticated)
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        localStorage.setItem('cartItems', JSON.stringify(items))
    }, [items])

    return (
        <Card>
            <CardContent>
                {items.length > 0 ? (
                    <Typography component={'div'} variant={'h5'}>
                        Cart
                        {auth ? <Button
                                component={Link}
                                style={{margin: '10px'}}
                                to={'/checkout'}
                                variant={'contained'}
                            >
                                Order
                            </Button> :
                            <Button
                                component={Link}
                                style={{margin: '10px'}}
                                to={'/signIn'}
                                variant={'contained'}
                            >
                                Order
                            </Button>}
                    </Typography>
                ) : (
                    <Typography component={'div'} variant={'h5'}>
                        Cart is empty
                    </Typography>
                )}

                {items.map(item => (
                    <CartItem
                        id={item.id}
                        key={item.id}
                        name={item.name}
                        photo={item.photo}
                        price={item.price}
                        quantity={item.quantity}
                    />
                ))}
                <Typography color={'text.secondary'} variant={'body1'}>
                    Total: ₽ {total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Cart
