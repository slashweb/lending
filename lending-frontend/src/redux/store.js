import { configureStore } from '@reduxjs/toolkit'
import appReducer from './reducers/app';
import lendingReducer from './reducers/lending';

export default configureStore({
  reducer: {
    app: appReducer,
    lenging: lendingReducer
  }
})