import { Button } from "@/components/ui/button";
import { ProductCard } from "./product.card";
import { ProductsPagination } from "./shop.pagination";
import { useGetAllProductsQuery } from "@/app/services/products.api";
import { useState } from "react";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Filter } from "./filter";

export const Shop = () => {
  // pagination info
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetAllProductsQuery({
    limit: 5,
    page,
    price: "",
    rating: "",
    sort: "",
  });

  // filter open and close
  const [filterOpen, setFilterOpen] = useState(false);

  const renderProducts = isLoading ? (
    <div>Loading.....</div>
  ) : error ? (
    <div>An error has occured while fetching</div>
  ) : data ? (
    <>
      {data.data.products.map((product) => {
        return <ProductCard product={product} key={product._id} />;
      })}
      <ProductsPagination setPage={setPage} data={data} page={page} />
    </>
  ) : (
    <div></div>
  );
  return (
    <AlertDialog open={filterOpen}>
      <div className="w-[95%] mx-auto flex flex-col gap-4 pb-4 min-h-[86.5vh] h-auto">
        <div className="flex items-center justify-between gap-4">
          <Button className="w-full">Search</Button>
          <Button onClick={() => setFilterOpen(true)}>Filter</Button>
        </div>
        {renderProducts}
      </div>
      <Filter setFilterOpen={setFilterOpen} />
    </AlertDialog>
  );
};
