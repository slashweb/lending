import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: null,
  hasAccount: null,
  isLoading: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    setHasAccount: (state, action) => {
      state.hasAccount = action.payload
    },
    setInitialState: (state) => {
      state = initialState;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserId, setHasAccount, setInitialState } = appSlice.actions

export default appSlice.reducer