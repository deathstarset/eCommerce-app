import { Product } from "@/types";

export type GetAllProductsResponse = {
  products: Product[];
  currentPage: number;
  totalPages: number;
};

export type GetProductResponse = {
  product: Product;
};

export interface ApiResponseGeneric<T> {
  status: boolean;
  message: string;
  data: T;
}
