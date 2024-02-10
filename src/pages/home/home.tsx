import hero from "../../assets/hero.webp";
import { Button } from "@/components/ui/button";
import { ProductsCarousel } from "./products.carousel";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div className="py-4 min-h-[86.5vh] h-auto">
      <img src={hero} alt="" className=" rounded" />
      <div className="flex items-center gap-4 justify-center py-4">
        <Button>
          <Link to="../shop">Shop Now</Link>
        </Button>
        <Button>
          <Link to="../cart">View Cart</Link>
        </Button>
      </div>
      <div className="flex flex-col items-center gap-4">
        <ProductsCarousel />
        <Button>
          <Link to="shop">View More</Link>
        </Button>
      </div>
    </div>
  );
};
