import { createSlice } from '@reduxjs/toolkit'

interface ProductState {
  items: { id: number; name: string; photo: string; price: number; quantity: number }[]
}

const initialState: ProductState = {
  items: [
    {
      id: 1,
      name: 'Mobile phone',
      photo:
        'https://abakan.xiaomi-sib.ru/media/cache/thumb_540_600/media/product_variant_image/402//54fb5ea98bea4bf1a182d071b7dbe1d088eb873a.jpeg',
      price: 100,
      quantity: 1,
    },
    {
      id: 2,
      name: 'TV',
      photo:
        'https://static.ru-mi.com/upload/resize_cache/iblock/9e4/440_440_1/ivzxm4nxe17ij2mycnh8p66hc3iw98bo.jpg',
      price: 200,
      quantity: 1,
    },
    {
      id: 3,
      name: 'vacuum cleaner',
      photo:
        'https://cdn1.technopark.ru/technopark/photos_resized/product/1000_1000/555741/1_555741.jpg',
      price: 150,
      quantity: 1,
    },
    {
      id: 4,
      name: 'kettle',
      photo: 'https://fabirlic.com/upload/iblock/eaf/8lwzzdclafp3oczuxuw35tntxtxygx8e.jpeg',
      price: 90,
      quantity: 1,
    },
    {
      id: 5,
      name: 'hair dryer',
      photo: 'https://hottek.ru/images/detailed/586/956-100_do3d-qs.jpg',
      price: 95,
      quantity: 1,
    },
    {
      id: 6,
      name: 'Cat',
      photo:
        'https://png.pngtree.com/png-clipart/20210829/original/pngtree-ginger-cat-animal-orange-fluff-png-image_6659115.jpg',
      price: 1,
      quantity: 1,
    },
  ],
}

const productSlice = createSlice({
  initialState,
  name: 'product',
  reducers: {},
})

export const {} = productSlice.actions
export default productSlice.reducer
