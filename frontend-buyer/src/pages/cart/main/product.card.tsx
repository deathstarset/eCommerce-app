import { Card } from "@/components/ui/card";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/app/hooks";
import {
  decrmentItemCount,
  incrementItemCount,
} from "@/app/features/cart.slice";
import { UPLOADS_URL } from "@/constants";
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
    <Card className="flex  w-full min-h-[100px] h-auto items-start p-4 gap-3">
      <img
        src={`${UPLOADS_URL}/${product.image}`}
        alt=""
        className="rounded w-[100px] h-[100px]"
      />
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold">{product.name}</h1>
        <p className="text-lg font-semibold">${product.price}</p>
        <div className="flex items-start flex-col justify-between">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => handleDecrementCount(product._id)}
              size={"icon"}
              className="h-[30px] w-[30px]"
            >
              -
            </Button>
            <div className="font-semibold">{count}</div>
            <Button
              className="h-[30px] w-[30px]"
              onClick={() => handleIncrementCount(product._id)}
              size={"icon"}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
