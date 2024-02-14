import { Order, Product } from "@/types";

export type GetAllProductsResponse = {
  products: Product[];
  currentPage: number;
  totalPages: number;
};

export type GetProductResponse = {
  product: Product;
};

export type CreateOrderResponse = {
  order: Order;
};

export interface ApiResponseGeneric<T> {
  success: boolean;
  message: string;
  data: T;
}
