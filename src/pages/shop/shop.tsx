import { Button } from "@/components/ui/button";
import { ProductCard } from "./product.card";
import { ProductsPagination } from "./shop.pagination";
import {
  selectProductsCurrentPage,
  selectProductsTotalPages,
  useGetAllProductsQuery,
} from "@/app/features/products.slice";
import { useState } from "react";
import { useAppSelector } from "@/app/hooks";

export const Shop = () => {
  const currentPage = useAppSelector(selectProductsCurrentPage);
  const totalPages = useAppSelector(selectProductsTotalPages);

  const [paginationInfos, setPaginationInfos] = useState({
    currentPage,
    totalPages,
  });
  console.log(paginationInfos);

  const { data, isLoading, error } = useGetAllProductsQuery({
    limit: 5,
    page: 1,
  });

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>An error has occured</div>;
  }

  return (
    <div className="w-[95%] mx-auto flex flex-col gap-4 pb-4">
      <Button>Filtering and shit like that</Button>
      {data?.data.products.map((product) => {
        return <ProductCard product={product} key={product._id} />;
      })}
      <ProductsPagination />
    </div>
  );
};
