import { configureStore } from '@reduxjs/toolkit'
import  counterSlice  from './features/CounterSlice'
import AuthSlice from './features/AuthSlice'

export const store = configureStore({
  reducer: {
    counter:counterSlice,
    auth: AuthSlice
  },
})