import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../constants/index";
import type {
  GetAllProductsResponse,
  ApiResponseGeneric,
  GetProductResponse,
} from "../types";
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      ApiResponseGeneric<GetAllProductsResponse>,
      { sort?: string; limit?: number; page?: number }
    >({
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
    getProduct: builder.query<
      ApiResponseGeneric<GetProductResponse>,
      { id: string }
    >({
      query: (args) => {
        return `/products/${args.id}`;
      },
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductQuery } = productsApi;
