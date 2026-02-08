import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from '../src/assets/redux/pastSlice'
export const store = configureStore({
  reducer: {
    paste:pasteReducer,
  },
})