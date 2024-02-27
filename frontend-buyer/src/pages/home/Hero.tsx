import hero from "../../assets/hero.jpg";
import { Button } from "@/components/ui/button";
export const Hero = () => {
  return (
    <div
      style={{ backgroundImage: `url(${hero})` }}
      className="w-full h-[70vh] bg-cover bg-no-repeat bg-left-bottom"
    >
      <div
        className="w-[95%] mx-auto flex flex-col justify-center h-full gap-10
  "
      >
        <h1 className="w-1/2 text-3xl text-white font-medium">
          Discover innovation at your fingertips with our curated selection of
          high-quality products
        </h1>
        <Button
          className="w-fit border-[1px] text-white font-medium"
          variant={"ghost"}
        >
          Browse
        </Button>
      </div>
    </div>
  );
};
