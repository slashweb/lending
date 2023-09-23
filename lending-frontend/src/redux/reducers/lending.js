import { createSlice } from '@reduxjs/toolkit'

export const lendingSlice = createSlice({
  name: 'lending',
  initialState: {
    product: null
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setProduct } = lendingSlice.actions

export default lendingSlice.reducer