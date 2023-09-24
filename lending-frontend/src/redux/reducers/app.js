import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: {},
  hasAccount: null,
  isLoading: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload
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
export const { setProfile, setHasAccount, setInitialState, setIsLoading } = appSlice.actions

export default appSlice.reducer