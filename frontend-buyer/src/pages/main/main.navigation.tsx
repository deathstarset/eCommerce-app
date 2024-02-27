import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlignJustify, ShoppingBag } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
export const MainNavigation = () => {
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navBar = pageWidth < 768 ? <MobileNavBar /> : <DesktopNavBar />;

  return (
    <div className="flex items-center justify-between w-[95%] mx-auto py-2">
      <Link to="/" className="text-xl font-bold">
        Ecommerce App
      </Link>
      {navBar}
    </div>
  );
};

const MobileNavBar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify size={30} />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-3">
        <SheetClose asChild>
          <Link to="/" className="font-semibold">
            Home
          </Link>
        </SheetClose>
        <SheetClose asChild className="">
          <Link to="about" className="font-semibold">
            About
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link to="contact" className="font-semibold">
            Contact
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link to="cart" className="font-semibold">
            Cart
          </Link>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

const DesktopNavBar = () => {
  return (
    <div className="flex items-center gap-10">
      <Link to="/">Home</Link>
      <Link to="about">About</Link>
      <Link to="contact">Contact</Link>
      <Link to="cart">
        <ShoppingBag />
      </Link>
    </div>
  );
};
