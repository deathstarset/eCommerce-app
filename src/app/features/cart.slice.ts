import { Product } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CartState = {
  items: Product[];
  count: number;
  totalPrice: number;
};
const initialState: CartState = {
  items: [],
  count: 0,
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      let counter = 0;
      state.items.forEach((product) => {
        if (product._id === action.payload._id) {
          counter++;
        }
      });
      if (counter === 0) {
        state.items.push(action.payload);
        state.totalPrice = state.items.reduce((acc, product) => {
          return acc + product.price;
        }, state.totalPrice);
      }
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter((product) => product !== action.payload);
    },
  },
});

export const selectCartProducts = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.totalPrice;

export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
