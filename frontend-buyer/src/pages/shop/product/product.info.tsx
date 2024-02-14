import { useGetProductQuery } from "@/app/services/products.api";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { Product } from "@/types";
import { addToCart } from "@/app/features/cart.slice";
import { UPLOADS_URL } from "@/constants";
export const ProductInfo = () => {
  const { productId } = useParams();
  const { data, isLoading, error } = useGetProductQuery({
    id: productId as string,
  });
  const dispatch = useAppDispatch();
  const [addedToCart, setIsAddedToCart] = useState(false);
  const handleAddToCart = (product: Product | undefined) => {
    if (product) {
      dispatch(addToCart(product));
      setIsAddedToCart(true);
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 1000);
    }
  };

  const renderProduct = isLoading ? (
    <div>Loading....</div>
  ) : error ? (
    <div>An error has occured</div>
  ) : data ? (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <img
          src={`${UPLOADS_URL}/${data.data.product.image}`}
          alt=""
          className="rounded h-[400px]"
        />
        <h1 className="text-3xl font-semibold">{data.data.product.name}</h1>
        <p>
          <span className="font-semibold">Description : </span>
          {data.data.product.description}
        </p>
        <p>
          <span className="font-semibold">Price :</span> $
          {data.data.product.price}
        </p>
        <p>
          <span className="font-semibold">Rating : </span>
          {data.data.product.rating}
        </p>
        <p>
          <span className="font-semibold">Quantity : </span>
          {data.data.product.quantity}
        </p>
        <div>
          <span className="font-semibold">Condition : </span>
          <Badge>{data.data.product.condition}</Badge>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <Button className="w-[100%]">Buy Now</Button>
        <Button
          className="w-[100%]"
          onClick={() => handleAddToCart(data.data.product)}
          disabled={addedToCart}
        >
          {addedToCart ? "Added To Cart" : "Add To Cart"}
        </Button>
      </div>
    </div>
  ) : (
    <div></div>
  );

  return (
    <div className="w-[95%] mx-auto min-h-[86.5vh] h-auto pb-4">
      {renderProduct}
    </div>
  );
};
