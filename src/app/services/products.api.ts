import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "@/types";
import { API_URL } from "../../constants/index";

type GetProductsResponse = {
  success: boolean;
  message: string;
  data: {
    products: Product[];
    totalPages: number;
    currentPage: number;
  };
};
type GetProductsArgs = {
  sort?: string;
  limit?: number;
  page?: number;
};
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<GetProductsResponse, GetProductsArgs>({
      query: (args) => {
        let queryParams = "/products?";
        let argsArr = Object.entries(args);
        argsArr.forEach((entry) => {
          queryParams += `${entry[0]}=${entry[1]}&`;
        });
        queryParams = queryParams.slice(0, queryParams.length - 1);
        return queryParams;
      },
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
