import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  product: null,
  myProducts: [],
}

export const lendingSlice = createSlice({
  name: 'lending',
  initialState,
  reducers: {
    clearStore: (state) => {
      state = initialState;
    },
    setProduct: (state, action) => {
      state.product = action.payload
    },
    setUserProducts: (state, action) => {
      //state.myProducts = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setProduct, setUserProducts, clearStore } = lendingSlice.actions

export default lendingSlice.reducer