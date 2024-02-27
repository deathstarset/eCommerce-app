import { FirstSection } from "./FirstSection";
import { Hero } from "./Hero";
import { SecondSection } from "./SecondSection";

export const Home = () => {
  return (
    <div className="py-4 min-h-[86.5vh] h-auto flex flex-col gap-10">
      <Hero />
      <FirstSection />
      <SecondSection />
    </div>
  );
};
