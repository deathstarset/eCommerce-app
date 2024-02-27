import { Button } from "@/components/ui/button";
import SectionImage from "../../assets/section-one.jpg";
export const FirstSection = () => {
  return (
    <div className="w-[95%] mx-auto flex justify-between items-center">
      <div className="flex flex-col gap-4 flex-1">
        <h1 className=" text-3xl font-medium">
          Cutting-Edge Tech & Competitive Prices
        </h1>
        <p className="w-3/4">
          Embark on a Journey of Innovation and Convenience: Explore Our
          Ecommerce Haven for Electronics, Where Cutting-Edge Marvels Power Up
          Your Lifestyle to New Heights at Unbeatable Prices!
        </p>
        <Button className="w-fit">Discover</Button>
      </div>
      <img
        src={SectionImage}
        alt=""
        className="w-[600px] h-[400px] object-cover rounded"
      />
    </div>
  );
};
