import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  selectProductsData,
  useGetAllProductsQuery,
} from "@/app/features/products.slice";
import { useAppSelector } from "@/app/hooks";

export function ProductsCarousel() {
  const { data, error, isLoading } = useGetAllProductsQuery({});
  const productsData = useAppSelector(selectProductsData);
  console.log(productsData);
  if (error) {
    return <div>An Error Has Occured While Fetching Products</div>;
  }
  if (isLoading) {
    return <div>Loading......</div>;
  }
  return (
    <Carousel className="w-[80%] m-auto max-w-xs mt-4">
      <CarouselContent>
        {data?.data.products.slice(0, 5).map((product, index) => {
          return (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="p-7  flex flex-col gap-3">
                    <img
                      src="https://placehold.co/800?text=Hello+World&font=roboto"
                      alt=""
                    />
                    <span className="text-xl font-semibold">
                      {product.name}
                    </span>
                    <p>
                      {(() => {
                        const productDescrptionArr =
                          product.description.split("");
                        productDescrptionArr.length = 30;
                        const productDescription =
                          productDescrptionArr.join("");
                        return `${productDescription}...`;
                      })()}
                    </p>
                    <Button>Add To Cart</Button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

/* 
{/*  */
