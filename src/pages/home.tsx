import hero from "../assets/hero.webp";
import { Button } from "@/components/ui/button";
import { ProductsCarousel } from "./products.carousel";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div className="h-fit py-4">
      <img src={hero} alt="" className=" rounded" />
      <div className="flex items-center gap-4 justify-center py-4">
        <Button>Shop Now</Button>
        <Button>View Cart</Button>
      </div>
      <div className="flex flex-col items-center gap-4">
        <ProductsCarousel />
        <Button>
          <Link to="shop?page=1">View More</Link>
        </Button>
      </div>
    </div>
  );
};
