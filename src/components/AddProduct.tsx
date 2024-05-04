import { useDispatch } from 'react-redux'

import { sendDataToFirebase } from '@/features/product/productSlice'

const AddProduct = () => {
  const dispatch = useDispatch()

  const sendDataToFirebaseHandler = () => {
    const data = {
      id: 30,
      name: 'John Doe',
      photo:
        'https://static.ru-mi.com/upload/resize_cache/iblock/9e4/440_440_1/ivzxm4nxe17ij2mycnh8p66hc3iw98bo.jpg',
      price: 100,
      quantity: 3,
    }

    dispatch(sendDataToFirebase(data))
  }

  return <button onClick={sendDataToFirebaseHandler}>Send Data to Firebase</button>
}

export default AddProduct
