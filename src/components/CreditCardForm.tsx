import React, { useState } from 'react'

interface CreditCardFormProps {
  onSubmit: (formData: { cardNumber: string; cvv: string; expirationDate: string }) => void
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [cvv, setCvv] = useState('')

  console.log(cardNumber + '' + expirationDate + '' + cvv)

  const handleSubmit = (e: React.FormEvent) => {
    localStorage.removeItem('cartItems')
    e.preventDefault()
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

export default CreditCardForm
