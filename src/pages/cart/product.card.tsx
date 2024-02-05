import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/app/hooks";
import {
  decrmentItemCount,
  incrementItemCount,
} from "@/app/features/cart.slice";
type ProductCardProps = {
  item: {
    product: Product;
    count: number;
  };
};
export const ProductCard = ({ item: { product, count } }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleDecrementCount = (id: string) => {
    dispatch(decrmentItemCount(id));
  };
  const handleIncrementCount = (id: string) => {
    dispatch(incrementItemCount(id));
  };

  return (
    <Card className="flex justify-between w-full min-h-[100px] h-auto ">
      <img src="https://placehold.co/100x100" alt="" />
      <div className="flex flex-col justify-between">
        <CardHeader className="text-lg font-semibold">
          {product.name}
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-lg font-semibold">${product.price}</p>
          <div className="flex items-center gap-3">
            <Button onClick={() => handleDecrementCount(product._id)}>-</Button>
            <div className="font-semibold">{count}</div>
            <Button onClick={() => handleIncrementCount(product._id)}>+</Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
