import { Product } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CartState = {
  items: { product: Product; count: number }[];
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
      state.items.forEach((item) => {
        if (item.product._id === action.payload._id) {
          counter++;
        }
      });
      if (counter === 0) {
        state.items.push({ product: action.payload, count: 1 });
        state.totalPrice = state.items.reduce((acc, item) => {
          return acc + item.product.price;
        }, state.totalPrice);
      } else {
        state.items = state.items.map((item) => {
          state.totalPrice += item.product.price;
          if (item.product._id === action.payload._id) {
            return { product: action.payload, count: item.count + 1 };
          }
          return item;
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter(
        (item) => item.product !== action.payload
      );
    },
    incrementItemCount: (state, action: PayloadAction<string>) => {
      let totalPrice = state.totalPrice;
      state.items = state.items.map((item) => {
        if (item.count < item.product.quantity) {
          totalPrice = totalPrice + item.product.price;
          if (item.product._id === action.payload) {
            return { product: item.product, count: item.count + 1 };
          }
        }
        return item;
      });
      state.totalPrice = totalPrice;
    },
    decrmentItemCount: (state, action: PayloadAction<string>) => {
      let totalPrice = state.totalPrice;
      state.items = state.items.map((item) => {
        if (item.product._id === action.payload) {
          if (item.count > 1) {
            totalPrice = totalPrice - item.product.price;
            return { product: item.product, count: item.count - 1 };
          }
        }
        return item;
      });
      state.totalPrice = totalPrice;
    },
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.totalPrice;

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  incrementItemCount,
  decrmentItemCount,
} = cartSlice.actions;
