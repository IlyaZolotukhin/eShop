import React from 'react'
import { useDispatch } from 'react-redux'

import { deleteCart } from '@/features/cart/cartSlice'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

interface CreditCardFormProps {
  onSubmit: (formData: { cardNumber: string; cvv: string; expirationDate: string }) => void
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ onSubmit }) => {
  const dispatch = useDispatch()

  const initialValues = {
    cardNumber: '',
    cvv: '',
    expirationDate: '',
  }

  const validationSchema = Yup.object({
    cardNumber: Yup.string()
      .matches(/^\d{16}$/, 'Invalid card number')
      .required('Required'),
    cvv: Yup.string()
      .matches(/^\d{3}$/, 'Invalid CVV')
      .required('Required'),
    expirationDate: Yup.string()
      .matches(/^\d{2}\/\d{2}$/, 'Invalid expiration date')
      .required('Required'),
  })

  const handleSubmit = (formData: { cardNumber: string; cvv: string; expirationDate: string }) => {
    localStorage.clear()
    dispatch(deleteCart())
    onSubmit(formData)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div>
          <label>Card Number</label>
          <Field name={'cardNumber'} type={'text'} />
          <ErrorMessage component={'div'} name={'cardNumber'} />
        </div>

        <div>
          <label>Expiration Date</label>
          <Field name={'expirationDate'} type={'text'} />
          <ErrorMessage component={'div'} name={'expirationDate'} />
        </div>

        <div>
          <label>CVV</label>
          <Field name={'cvv'} type={'text'} />
          <ErrorMessage component={'div'} name={'cvv'} />
        </div>

        <button type={'submit'}>Submit</button>
      </Form>
    </Formik>
  )
}

export default CreditCardForm

/*import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { deleteCart } from '@/features/cart/cartSlice'

interface CreditCardFormProps {
  onSubmit: (formData: { cardNumber: string; cvv: string; expirationDate: string }) => void
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [cvv, setCvv] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
   
    localStorage.clear()
    dispatch(deleteCart())

    onSubmit({ cardNumber, cvv, expirationDate })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Card Number</label>
        <input onChange={e => setCardNumber(e.target.value)} type={'text'} value={cardNumber} />
      </div>
      <div>
        <label>Expiration Date</label>
        <input
          onChange={e => setExpirationDate(e.target.value)}
          type={'text'}
          value={expirationDate}
        />
      </div>
      <div>
        <label>CVV</label>
        <input onChange={e => setCvv(e.target.value)} type={'text'} value={cvv} />
      </div>
      <button type={'submit'}>Submit</button>
    </form>
  )
}

export default CreditCardForm*/
