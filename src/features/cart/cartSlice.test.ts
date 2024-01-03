import {
  CartState,
  addItem,
  cartSlice,
  decreaseItem,
  deleteCart,
  increaseItem,
  removeItem,
  setCart,
} from './cartSlice'

describe('cartSlice reducers', () => {
  let initialState: CartState

  beforeEach(() => {
    initialState = {
      items: [],
    }
  })

  test('addItem should add a new item to the cart', () => {
    const item = { id: 1, name: 'Item 1', photo: 'photo1.jpg', price: 10, quantity: 1 }
    const expectedState = {
      items: [item],
    }

    const newState = cartSlice.reducer(initialState, addItem(item))

    expect(newState).toEqual(expectedState)
  })

  test('decreaseItem should decrease the quantity of an item in the cart', () => {
    const item = { id: 1, name: 'Item 1', photo: 'photo1.jpg', price: 10, quantity: 2 }
    const initialStateWithItem = {
      items: [item],
    }
    const expectedState = {
      items: [{ ...item, quantity: 1 }],
    }

    const newState = cartSlice.reducer(initialStateWithItem, decreaseItem(1))

    expect(newState).toEqual(expectedState)
  })

  test('deleteCart should remove all items from the cart', () => {
    const initialStateWithItems = {
      items: [
        { id: 1, name: 'Item 1', photo: 'photo1.jpg', price: 10, quantity: 1 },
        { id: 2, name: 'Item 2', photo: 'photo2.jpg', price: 20, quantity: 2 },
      ],
    }
    const expectedState = {
      items: [],
    }

    const newState = cartSlice.reducer(initialStateWithItems, deleteCart())

    expect(newState).toEqual(expectedState)
  })

  test('increaseItem should increase the quantity of an item in the cart', () => {
    const item = { id: 1, name: 'Item 1', photo: 'photo1.jpg', price: 10, quantity: 2 }
    const initialStateWithItem = {
      items: [item],
    }
    const expectedState = {
      items: [{ ...item, quantity: 3 }],
    }

    const newState = cartSlice.reducer(initialStateWithItem, increaseItem(1))

    expect(newState).toEqual(expectedState)
  })

  test('removeItem should remove an item from the cart by id', () => {
    const items = [
      { id: 1, name: 'Item 1', photo: 'photo1.jpg', price: 10, quantity: 1 },
      { id: 2, name: 'Item 2', photo: 'photo2.jpg', price: 20, quantity: 2 },
    ]
    const initialStateWithItems = {
      items,
    }
    const expectedState = {
      items: [items[0]],
    }

    const newState = cartSlice.reducer(initialStateWithItems, removeItem(2))

    expect(newState).toEqual(expectedState)
  })

  test('setCart should set the cart to a new set of items', () => {
    const items = [
      { id: 1, name: 'Item 1', photo: 'photo1.jpg', price: 10, quantity: 1 },
      { id: 2, name: 'Item 2', photo: 'photo2.jpg', price: 20, quantity: 2 },
    ]
    const expectedState = {
      items,
    }

    const newState = cartSlice.reducer(initialState, setCart(items))

    expect(newState).toEqual(expectedState)
  })
})
