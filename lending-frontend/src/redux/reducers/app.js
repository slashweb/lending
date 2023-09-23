import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    userId: null,
    hasAccount: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    setHasAccount: (state, action) => {
      state.hasAccount = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserId, setHasAccount } = appSlice.actions

export default appSlice.reducer