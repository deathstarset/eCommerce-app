import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/types";

type ProductCardProps = {
  product: Product;
};
export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="flex justify-between w-full min-h-[100px] h-auto p-4">
      <img src="https://placehold.co/100x100" alt="" />
      <div className="flex flex-col justify-between">
        <CardHeader className="text-lg font-semibold">
          {product.name}
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">${product.price}</p>
        </CardContent>
      </div>
    </Card>
  );
};
