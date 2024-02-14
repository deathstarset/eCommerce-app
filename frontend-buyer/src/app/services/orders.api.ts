import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../constants/index";
import { ApiResponseGeneric, CreateOrderResponse } from "../types";
import { Product } from "@/types";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      ApiResponseGeneric<CreateOrderResponse>,
      {
        personal_info: {
          first_name: string;
          last_name: string;
          email: string;
          phone_number: string;
          shipping_address: string;
        };
        items: { count: number; product: Product }[];
        total_amount: number;
      }
    >({
      query: (args) => ({
        url: "/orders",
        method: "POST",
        body: args,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
