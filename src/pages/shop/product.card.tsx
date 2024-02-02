import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

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
        <Button variant="outline">More Info</Button>
      </CardFooter>
    </Card>
  );
}
