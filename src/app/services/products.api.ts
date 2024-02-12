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
      {
        sort?: string;
        limit?: number;
        page?: number;
        price?: string;
        rating?: string;
        condition?: string;
      }
    >({
      query: (args) => {
        const argsArr = Object.entries(args);

        let queryString = "/products?";

        argsArr.forEach((entry) => {
          if (entry[1] !== "") {
            if (entry[0] === "price" || entry[0] === "rating") {
              console.log("test");
            }
            queryString += `${entry[0]}=${entry[1]}&`;
          }
        });
        queryString = queryString.slice(0, queryString.length - 1);

        console.log(queryString);

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
