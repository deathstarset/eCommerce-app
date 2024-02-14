import { Card } from "@/components/ui/card";
import { selectCartItems, selectCartTotal } from "@/app/features/cart.slice";
import { useAppSelector } from "@/app/hooks";

export const CartItemsOverview = () => {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  return (
    <Card className="flex flex-col gap-4 p-4">
      <div>
        {items.map((item, index) => {
          return (
            <div key={index} className="flex items-center justify-between">
              <p>{item.product.name}</p>
              <div className="flex items-center gap-2">
                <p>x{item.count}</p>
                <p>${item.product.price * item.count}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between">
        <p>Total :</p>
        <p>${total.toFixed(2)}</p>
      </div>
    </Card>
  );
};
