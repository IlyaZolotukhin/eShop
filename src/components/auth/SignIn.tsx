import React, {useState} from 'react';
import * as Yup from "yup";
import {useFormik} from "formik";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography} from "@mui/material";
import s from "@/components/CreditCardForm/CreditCardForm.module.css";
import {useNavigate} from "react-router-dom";

import {signIn} from "@/features/auth/authSlice";
import {RootState, useAppDispatch} from "@/store";
import {useSelector} from "react-redux";

const SignIn: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const error = useSelector((state: RootState) => state.auth.error)

    const LoginParams = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .matches(/^\S+@\S+\.\S+$/, 'Enter a valid email address')
            .required('Email is a required field'),
        password: Yup.string()
            .matches(/^[a-zA-Z0-9]{1,6}$/, 'Create a password of no more than 6 characters, numbers, and letters')
            .required('Password is a required field'),
    })

    const formik = useFormik({
        initialValues: LoginParams,
        onSubmit: formData => {
            dispatch(signIn(formData)).then((user) => {
                console.log(user)
                setOpen(true)
            })
        },
        validationSchema,
    })

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
        navigate("/");
    }

    const message = error ? 'Error: ' + error : 'You are logged in to your account';

    return (
        <Grid className={s.form} container justifyContent={'center'}>
            <Grid item xs={8}>
                <Typography component={'div'} variant={'h3'}>
                    Login
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Dialog onClose={handleClose} open={open}>
                        <DialogTitle className={s.dialogTitle}>account message</DialogTitle>
                        <DialogContent>
                            <Typography component={'div'} style={{color: error ? 'red' : 'green'}} variant={'body2'}>
                                {message}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus color={'primary'} onClick={handleClose}>
                                CLOSE
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <div className={s.container}>
                        <TextField
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            label={'email'}
                            name={'email'}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            variant={'outlined'}
                        />
                        <TextField
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            label={'password'}
                            name={'password'}
                            onChange={formik.handleChange}
                            style={{ margin: '20px 0 20px 0' }}
                            value={formik.values.password}
                            variant={'outlined'}
                        />
                        <Button color={'primary'} type={'submit'} variant={'contained'}>
                            Login
                        </Button>
                    </div>
                </form>
            </Grid>
        </Grid>
    )
}

export default SignIn;