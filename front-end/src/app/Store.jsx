import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '../services/Authenticationapi'
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'
import {cartReducer} from "../features/cartSlice";
import { productApi } from '../services/ProductApi'
import {productReducer} from "../features/productSlice"
import {orderApi} from "../services/Orderapi"
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,


    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
    product: productReducer,


  },
  
    

  middleware: 
    (getDefaultMiddleware) =>getDefaultMiddleware().concat([
      authApi.middleware,
      productApi.middleware,
      orderApi.middleware
    ]),
  

})


setupListeners(store.dispatch)