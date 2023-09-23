import { createSlice } from '@reduxjs/toolkit'

export interface AppState {
  userId: string;
}

const initialState: AppState = {
  userId: '',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserId } = appSlice.actions

export default appSlice.reducer