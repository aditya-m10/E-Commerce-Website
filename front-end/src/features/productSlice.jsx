import { createSlice } from '@reduxjs/toolkit'
// const productState =
// localStorage.getItem("product") !== null
//     ? JSON.parse(localStorage.getItem("product"))
//     : [];
const initialState = []

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductdata: (state, action) => {
      console.log("satae",action.payload)
      state = action.payload
      localStorage.setItem("product", JSON.stringify(state));
      return state 
    },
  },
})

export const { setProductdata } = productSlice.actions

export   const productReducer= productSlice.reducer