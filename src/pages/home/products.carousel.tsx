import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllProductsQuery } from "@/app/services/products.api";
import { addToCart } from "@/app/features/cart.slice";
import { useAppDispatch } from "@/app/hooks";
import { useState } from "react";
import { Product } from "@/types";
import { UPLOADS_URL } from "@/constants";
export function ProductsCarousel() {
  const { data, error, isLoading } = useGetAllProductsQuery({});
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useAppDispatch();
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };
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
                  <CardContent className="p-4  flex flex-col gap-3">
                    <img
                      src={`${UPLOADS_URL}/${product.image}`}
                      alt={`${product.name} Image`}
                      loading="lazy"
                      className="h-[250px] rounded"
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
                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={addedToCart}
                    >
                      {addedToCart ? "Added To Cart" : "Add To Cart"}
                    </Button>
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
