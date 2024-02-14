import { useState } from "react";
import { Link } from "react-router-dom";
import { AlignJustify, X } from "lucide-react";
export const MainNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleNavOpen = () => {
    // closing the navbar if its open
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };
  // making the navbar
  const navBar = (
    <div className="">
      <div
        className={`bg-black w-full fixed z-10 top-0 left-0 h-full overscroll-none opacity-25 ${
          !isOpen && "hidden"
        }`}
        onClick={handleNavOpen}
      ></div>
      <div
        className={`bg-white p-5 flex justify-between fixed  h-full top-0 w-1/2 z-20 transition-all duration-500 ${
          isOpen ? "right-0" : "right-[-50%]"
        }`}
      >
        <div className="flex flex-col gap-5">
          <Link to="/" className="font-semibold" onClick={handleLinkClick}>
            Home
          </Link>
          <Link to="/about" className="font-semibold" onClick={handleLinkClick}>
            About
          </Link>
          <Link
            to="/contact"
            className="font-semibold"
            onClick={handleLinkClick}
          >
            Contact
          </Link>
          <Link to="/cart" className="font-semibold" onClick={handleLinkClick}>
            Cart
          </Link>
        </div>
        <X onClick={handleNavOpen} size={30} />
      </div>
    </div>
  );
  return (
    <div className="overflow-hidden">
      <div className="flex items-center justify-between w-[95%] mx-auto pb-4">
        <Link to="/" className="text-xl font-bold">
          Ecommerce App
        </Link>
        <AlignJustify onClick={handleNavOpen} size={30} />
      </div>
      {navBar}
    </div>
  );
};
