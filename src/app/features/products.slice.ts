import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { Product } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { productsApi } from "../services/products.api";
interface ProductsState {
  products: Product[] | undefined;
  totalPages: number | undefined;
  currentPage: number;
  countPerPage: number;
}

const initialState: ProductsState = {
  products: undefined,
  totalPages: undefined,
  currentPage: 1,
  countPerPage: 5,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    nextPage: (state) => {
      if (state.totalPages) {
        if (state.currentPage < state.totalPages) {
          state.currentPage += 1;
        }
      }
    },
    previousPage: (state) => {
      if (state.currentPage >= 2) {
        state.currentPage -= 1;
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.getAllProducts.matchFulfilled,
      (
        state,
        action: PayloadAction<{
          data: {
            products: Product[];
            totalPages: number;
            currentPage: number;
          };
          message: string;
          success: boolean;
        }>
      ) => {
        state.products = action.payload.data.products;
        state.currentPage = action.payload.data.currentPage;
        state.totalPages = action.payload.data.totalPages;
      }
    );
  },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectCurrentPage = (state: RootState) =>
  state.products.currentPage;
export const selectTotalPages = (state: RootState) => state.products.totalPages;
export const selectCountPerPage = (state: RootState) =>
  state.products.countPerPage;
export const { nextPage, previousPage, setCurrentPage } = productsSlice.actions;
export default productsSlice.reducer;
