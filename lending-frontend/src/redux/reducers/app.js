import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    userId: null
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserId } = appSlice.actions

export default appSlice.reducer