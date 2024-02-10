import { ProductCard } from "./product.card";
import { useAppSelector } from "@/app/hooks";
import { selectCartItems, selectCartTotal } from "@/app/features/cart.slice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const items = useAppSelector(selectCartItems);
  const renderProducts =
    items.length === 0 ? (
      <div className="text-center text-xl font-semibold">
        There is nothing in cart
      </div>
    ) : (
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <ProductCard item={item} key={item.product._id} />
        ))}
      </div>
    );

  return <div>{renderProducts}</div>;
};

export const Cart = () => {
  const totalPrice = useAppSelector(selectCartTotal);
  return (
    <div className="w-[95%] mx-auto flex flex-col gap-5 min-h-[86.5vh] h-auto py-4">
      <ProductsList />
      <Card className="flex justify-between items-center p-4">
        <h1 className=" text-lg font-semibold">Total</h1>
        <h1 className=" text-lg font-semibold">${totalPrice.toFixed(2)}</h1>
      </Card>
      <Link to="payment">
        <Button className="w-full">Procced To Payment</Button>
      </Link>
    </div>
  );
};
