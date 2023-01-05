import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '../services/Authenticationapi'
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'
import {cartReducer} from "../features/cartSlice";


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    user: userReducer,
    cart: cartReducer

  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})


setupListeners(store.dispatch)