import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllProductsQuery } from "@/app/services/products.api";
import { CarouselProduct } from "./product.carousel";

export const ProductsCarousel = () => {
  const { data, error, isLoading } = useGetAllProductsQuery({ limit: 20 });

  if (error) {
    return <div>An Error Has Occured While Fetching Products</div>;
  }
  if (isLoading) {
    return <div>Loading......</div>;
  }

  return (
    <Carousel className="w-[95%] mx-auto mt-4">
      <CarouselContent>
        {data?.data.products.map((product) => {
          return <CarouselProduct product={product} key={product._id} />;
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
