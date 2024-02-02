import {
  selectCurrentPage,
  selectProducts,
  selectTotalPages,
  selectCountPerPage,
} from "@/app/features/products.slice";
import { useAppSelector } from "@/app/hooks";
import { useGetAllProductsQuery } from "@/app/services/products.api";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product.card";
import { ProductsPagination } from "./shop.pagination";

export const Shop = () => {
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);
  const countPerPage = useAppSelector(selectCountPerPage);
  const { isLoading, error } = useGetAllProductsQuery(
    {
      limit: countPerPage,
      page: currentPage,
    },
    { refetchOnMountOrArgChange: true }
  );
  const products = useAppSelector(selectProducts);

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>An error has occured</div>;
  }
  return (
    <div className="w-[95%] mx-auto flex flex-col gap-4 pb-4">
      <Button>Filtering and shit like that</Button>
      {products?.map((product) => {
        return <ProductCard product={product} key={product._id} />;
      })}
      <ProductsPagination />
    </div>
  );
};
