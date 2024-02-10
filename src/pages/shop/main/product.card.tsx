import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks";
import { useState } from "react";
import { addToCart } from "@/app/features/cart.slice";
import { UPLOADS_URL } from "@/constants";
type ProductCardProps = {
  product: Product;
};
export function ProductCard({ product }: ProductCardProps) {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };
  return (
    <Card className="">
      <CardHeader className="flex flex-col gap-2">
        <img
          loading="lazy"
          src={`${UPLOADS_URL}/${product.image}`}
          alt={`${product.name} Image`}
          className="h-[300px] rounded"
        />
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <CardDescription>{product.price}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button onClick={handleAddToCart} disabled={addedToCart}>
          {addedToCart ? "Added To Cart" : "Add To Cart"}
        </Button>
        <Button variant={"outline"}>
          <Link to={product._id}>More Info</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
