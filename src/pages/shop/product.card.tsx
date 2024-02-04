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
type ProductCardProps = {
  product: Product;
};
export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="">
      <CardHeader className="flex flex-col gap-2">
        <img src="https://placehold.co/400" />
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <CardDescription>{product.price}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button>Add To Cart</Button>
        <Button variant={"outline"}>
          <Link to={product._id}>More Info</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
