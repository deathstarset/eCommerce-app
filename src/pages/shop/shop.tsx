import { Button } from "@/components/ui/button";
import { ProductCard } from "./product.card";
import { ProductsPagination } from "./shop.pagination";
import { useGetAllProductsQuery } from "@/app/services/products.api";
import { useState } from "react";

export const Shop = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetAllProductsQuery({
    limit: 5,
    page,
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
      <ProductsPagination setPage={setPage} data={data} page={page} />
    </div>
  );
};
