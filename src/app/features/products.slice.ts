import { createSelector, createSlice } from "@reduxjs/toolkit";
import { productsApi } from "../services/products.api";
import { Product } from "@/types";
import { PayloadAction } from "@reduxjs/toolkit";
type InitialStateType = {
  products: Product[] | null;
  totalPages: number | null;
  currentPage: number;
};
const initialState: InitialStateType = {
  products: null,
  totalPages: null,
  currentPage: 1,
};

type ResponseType = {
  success: boolean;
  message: string;
  data: {
    products: Product[];
    currentPage: number;
    totalPages: number;
  };
};

type ArgsType = {
  sort?: string;
  limit?: number;
  page?: number;
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<InitialStateType>) {
      state.products = action.payload.products;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const extendedProductsApiSlice = productsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<ResponseType, ArgsType>({
      query: (args) => {
        const argsArr = Object.entries(args);
        let queryString = "/products?";
        argsArr.forEach((entry) => {
          queryString += `${entry[0]}=${entry[1]}&`;
        });
        queryString.slice(0, queryString.length - 1);
        return queryString;
      },
      providesTags: ["Product"],
    }),
  }),
});

// getting the result of our query function above
export const selectProductsResult =
  extendedProductsApiSlice.endpoints.getAllProducts.select({});

// memoized selector to not to have to execute the function everytime if the data doesn't change
export const selectProductsData = createSelector(
  selectProductsResult,
  (productsResult) => productsResult.data
);
export const selectProductsCurrentPage = createSelector(
  selectProductsResult,
  (productsResult) => productsResult.data?.data.currentPage
);
export const selectProductsTotalPages = createSelector(
  selectProductsResult,
  (productsResult) => productsResult.data?.data.totalPages
);
// query hook generated from the query above
export const { useGetAllProductsQuery } = extendedProductsApiSlice;
