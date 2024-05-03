import firebase from 'firebase/database'

const AddProduct = () => {
  const sendDataToFirebase = () => {
    const data = {
      age: 30,
      email: 'johndoe@example.com',
      name: 'John Doe',
    }

    firebase
      .database()
      .ref('users')
      .push(data)
      .then(() => {
        console.log('Data sent successfully')
      })
      .catch(error => {
        console.error('Error sending data:', error)
      })
  }

  return <button onClick={sendDataToFirebase}>Send Data to Firebase</button>
}

export default AddProduct
