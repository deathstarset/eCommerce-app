import { useGetProductQuery } from "@/app/services/products.api";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
export const ProductInfo = () => {
  const { productId } = useParams();
  const { data, isLoading, error } = useGetProductQuery({
    id: productId as string,
  });

  if (isLoading) {
    return <div>Loading....</div>;
  } else if (error) {
    return <div>An error has occured</div>;
  } else {
    return (
      <div className="w-[95%] m-auto pb-4 flex flex-col gap-5 h-screen">
        <div className="flex flex-col gap-4">
          <img src="https://placehold.co/600x400" alt="" className="rounded" />
          <h1 className="text-3xl font-semibold">{}</h1>
          <p>
            <span className="font-semibold">Description : </span>
            {data?.data.product.description}
          </p>
          <p>
            <span className="font-semibold">Price :</span> $
            {data?.data.product.price}
          </p>
          <p>
            <span className="font-semibold">Rating : </span>
            {data?.data.product.rating}
          </p>
          <p>
            <span className="font-semibold">Quantity : </span>
            {data?.data.product.quantity}
          </p>
          <p>
            <span className="font-semibold">Condition : </span>
            <Badge>{data?.data.product.condition}</Badge>
          </p>
        </div>
        <div className="flex justify-between gap-2">
          <Button className="w-[100%]">Buy Now</Button>
          <Button className="w-[100%]">Add To Cart</Button>
        </div>
      </div>
    );
  }
};
