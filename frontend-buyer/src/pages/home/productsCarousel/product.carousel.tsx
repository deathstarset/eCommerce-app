import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";
import { UPLOADS_URL } from "@/constants";
import { CarouselItem } from "@/components/ui/carousel";
import { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { addToCart } from "@/app/features/cart.slice";

interface CarouselProductProps {
  product: Product;
}
export const CarouselProduct = ({ product }: CarouselProductProps) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useAppDispatch();
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };
  return (
    <CarouselItem key={product._id} className="md:basis-1/2 lg:basis-1/4">
      <div className="p-1">
        <Card>
          <CardContent className="p-4  flex flex-col gap-3 -ml-1">
            <img
              src={`${UPLOADS_URL}/${product.image}`}
              alt={`${product.name} Image`}
              loading="lazy"
              className="h-[250px] rounded"
            />
            <span className="text-xl font-semibold">{product.name}</span>

            <div className="flex items-center justify-between">
              <p>${product.price}</p>
              <Button
                onClick={() => handleAddToCart(product)}
                disabled={addedToCart}
              >
                {addedToCart ? "Added To Cart" : "Add To Cart"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};
