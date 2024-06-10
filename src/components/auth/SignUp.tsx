import React from 'react';
import * as Yup from "yup";
import {useFormik} from "formik";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography} from "@mui/material";
import s from "@/components/CreditCardForm/CreditCardForm.module.css";
import {Link} from "react-router-dom";

// @ts-ignore
const SignUp: React.FC = ({ onSubmit }) => {
    /*const dispatch = useDispatch()*/
    const initialValues = {
        email: '',
        password: '',
        passwordRepeat: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .matches(/^\S+@\S+\.\S+$/, 'Enter a valid email address')
            .required('Email is a required field'),
        password: Yup.string()
            .matches(/^[a-zA-Z0-9]{1,6}$/, 'Create a password of no more than 6 characters, numbers, and letters')
            .required('Password is a required field'),
        passwordRepeat: Yup.string()
            .oneOf([Yup.ref('password'), null as unknown as string], 'Passwords must match')
            .required('Repeat password is a required field'),
    })

    const formik = useFormik({
        initialValues,
        onSubmit: formData => {
            localStorage.clear()
            /*dispatch(deleteCart())*/
            setOpen(true)
            onSubmit(formData)
        },
        validationSchema,
    })

    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Grid className={s.form} container justifyContent={'center'}>
            <Grid item xs={8}>
                <Typography component={'div'} variant={'h3'}>
                    Create account
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Dialog onClose={handleClose} open={open}>
                        <DialogTitle className={s.dialogTitle}>account message</DialogTitle>
                        <DialogContent>
                            <div>Your are successfully registered</div>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus color={'primary'} onClick={handleClose} component={Link} to={'/'}>
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

                        <TextField
                            error={formik.touched.passwordRepeat && Boolean(formik.errors.passwordRepeat)}
                            helperText={formik.touched.passwordRepeat && formik.errors.passwordRepeat}
                            label={'Repeat password'}
                            name={'passwordRepeat'}
                            onChange={formik.handleChange}
                            value={formik.values.passwordRepeat}
                            variant={'outlined'}
                        />

                        <Button color={'primary'} type={'submit'} variant={'contained'}>
                            Create account
                        </Button>
                    </div>
                </form>
            </Grid>
        </Grid>
    )
}

export default SignUp;