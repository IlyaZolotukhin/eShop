import React from 'react'
import { useDispatch } from 'react-redux'

import { deleteCart } from '@/features/cart/cartSlice'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import s from './CreditCardForm.module.css'

// @ts-ignore
const CreditCardForm: React.FC = ({ onSubmit }) => {
  const dispatch = useDispatch()
  const initialValues = {
    cardNumber: '',
    cvv: '',
    expirationDate: '',
  }

  const validationSchema = Yup.object({
    cardNumber: Yup.string()
      .matches(/^\d{16}$/, 'enter any 16 digits')
      .required('required field'),
    cvv: Yup.string()
      .matches(/^\d{3}$/, 'enter any 3 digits')
      .required('required field'),
    expirationDate: Yup.string()
      .matches(/^\d{2}\/\d{2}$/, '\n' + 'enter the date in the format 01/01')
      .required('required field'),
  })

  const formik = useFormik({
    initialValues,
    onSubmit: formData => {
      localStorage.clear()
      dispatch(deleteCart())
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
        <form onSubmit={formik.handleSubmit}>
          <Dialog onClose={handleClose} open={open}>
            <DialogTitle className={s.dialogTitle}>payment message</DialogTitle>
            <DialogContent>
              <div>Your order has been successfully paid</div>
            </DialogContent>
            <DialogActions>
              <Button autoFocus color={'primary'} onClick={handleClose}>
                CLOSE
              </Button>
            </DialogActions>
          </Dialog>

          <div className={s.container}>
            <TextField
              error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
              label={'Card Number'}
              name={'cardNumber'}
              onChange={formik.handleChange}
              value={formik.values.cardNumber}
              variant={'outlined'}
            />

            <TextField
              error={formik.touched.expirationDate && Boolean(formik.errors.expirationDate)}
              helperText={formik.touched.expirationDate && formik.errors.expirationDate}
              label={'Expiration Date'}
              name={'expirationDate'}
              onChange={formik.handleChange}
              style={{ margin: '20px 0 20px 0' }}
              value={formik.values.expirationDate}
              variant={'outlined'}
            />

            <TextField
              error={formik.touched.cvv && Boolean(formik.errors.cvv)}
              helperText={formik.touched.cvv && formik.errors.cvv}
              label={'CVV'}
              name={'cvv'}
              onChange={formik.handleChange}
              value={formik.values.cvv}
              variant={'outlined'}
            />

            <Button color={'primary'} type={'submit'} variant={'contained'}>
              Pay
            </Button>
          </div>
        </form>
      </Grid>
    </Grid>
  )
}

export default CreditCardForm
