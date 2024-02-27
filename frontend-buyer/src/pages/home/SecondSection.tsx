import { ProductsCarousel } from "./productsCarousel/products.carousel";

export const SecondSection = () => {
  return (
    <div className="w-[95%] mx-auto flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-medium">Trending Products</h1>
        <ProductsCarousel />
      </div>
      <div>
        <h1 className="text-2xl font-medium">Latest Products</h1>
        <ProductsCarousel />
      </div>
    </div>
  );
};
