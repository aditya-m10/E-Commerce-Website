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
    increment(state, { payload }) {
      return state.map((item) =>
        item.id === payload
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      );
    },
    decrement(state, { payload }) {
      return state.map((item) =>
        item.id === payload
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      );
    },
    clear(state) {
      return [];
    },
    removeItem: (state, action ) => {
      const removeItem = state.filter((item) => item.id !== action.payload);
      state= removeItem;
      return state

    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  increment,
  decrement,
  clear,
  removeItem,
} = cartSlice.actions;