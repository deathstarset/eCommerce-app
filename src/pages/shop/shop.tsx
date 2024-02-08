import { Button } from "@/components/ui/button";
import { ProductCard } from "./product.card";
import { ProductsPagination } from "./shop.pagination";
import { useGetAllProductsQuery } from "@/app/services/products.api";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

const Filter = () => {
  return (
    <AlertDialogContent className="w-[95%] rounded h-[86.5vh] my-2">
      <AlertDialogHeader className="flex flex-col items-start">
        <AlertDialogTitle>Filter The Products</AlertDialogTitle>
        <AlertDialogDescription className="w-full">
          <div className="w-full items-start flex flex-col gap-2">
            <h1>Price</h1>
            <Slider
              defaultValue={[80]}
              max={100}
              step={1}
              className={"w-full"}
            />
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
export const Shop = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetAllProductsQuery({
    limit: 5,
    page,
  });

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
    <AlertDialog>
      <div className="w-[95%] mx-auto flex flex-col gap-4 pb-4 min-h-[86.5vh] h-auto">
        <div className="flex items-center justify-between gap-4">
          <Button className="w-full">Search</Button>
          <AlertDialogTrigger>
            <Button>Filter And Sort</Button>
          </AlertDialogTrigger>
        </div>
        {renderProducts}
      </div>
      <Filter />
    </AlertDialog>
  );
};
