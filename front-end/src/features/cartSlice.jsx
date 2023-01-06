import { createSlice } from "@reduxjs/toolkit";
const cartState =
  localStorage.getItem("item") !== null
    ? JSON.parse(localStorage.getItem("item"))
    : [];

const initialState = cartState;

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
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        state.push({
          ...payload,
          quantity: 1,
        });
      }
      localStorage.setItem("item", JSON.stringify(state));
    },
    increment(state, { payload }) {
      const Increment = state.map((item) =>
        item.id === payload
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
      state = Increment;
      localStorage.setItem("item", JSON.stringify(state));
      return state;
    },
    decrement(state, { payload }) {
      const Decrement = state.map((item) =>
        item.id === payload
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      );
      state = Decrement;
      localStorage.setItem("item", JSON.stringify(state));
      return state;
    },
    clear(state) {
      state=[]
      localStorage.setItem("item", JSON.stringify(state));
      return state;
    },
    removeItem: (state, action) => {
      const removeItem = state.filter((item) => item.id !== action.payload);
      state = removeItem;
      localStorage.setItem("item", JSON.stringify(state));

      return state;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, increment, decrement, clear, removeItem } =
  cartSlice.actions;
