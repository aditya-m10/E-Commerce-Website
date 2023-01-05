import { createSlice } from '@reduxjs/toolkit';
const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      const { id } = payload;
      const find = state.find((item) => item.id === id);

      if (find) {
        return state.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );
      } else {
        state.push({
          ...payload,
          quantity: 1
        });
      }
    },
    // incrementQuantity: (state, action) => {
    //   const item = state.cart.find((item) => item.id === action.payload);
    //   item.quantity++;
    // },
    // decrementQuantity: (state, action) => {
    //   const item = state.cart.find((item) => item.id === action.payload);
    //   if (item.quantity === 1) {
    //     item.quantity = 1
    //   } else {
    //     item.quantity--;
    //   }
    // },
    // removeItem: (state, action) => {
    //   const removeItem = state.cart.filter((item) => item.id !== action.payload);
    //   state.cart = removeItem;
    // },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  // incrementQuantity,
  // decrementQuantity,
  // removeItem,
} = cartSlice.actions;