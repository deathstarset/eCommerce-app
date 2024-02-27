import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const socials = [
  { name: "Instagram", comp: <Instagram color="white" size={16} /> },
  { name: "Twitter", comp: <Twitter color="white" size={16} /> },
  { name: "Facebook", comp: <Facebook color="white" size={16} /> },
];

const information = ["About", "Contact", "Cart"];

export const MainFooter = () => {
  return (
    <div className="bg-black py-4 ">
      <div className="w-[95%] mx-auto flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:gap-20">
          <div className="flex flex-col gap-1">
            <h1 className="text-white font-medium text-xl">Social Media</h1>
            <div className="flex flex-col gap-1">
              {socials.map((item, index) => {
                return (
                  <a
                    href=""
                    className="flex items-center gap-1 border-b-2 border-black hover:border-white w-fit"
                    key={index}
                  >
                    {item.comp}
                    <p className="text-white font-light">{item.name}</p>
                  </a>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-white font-medium text-xl">Information</h1>
            <div className="flex flex-col gap-1">
              {information.map((item, index) => {
                return (
                  <Link
                    to={`${item.toLowerCase()}`}
                    className="text-white font-light border-b-2 border-black hover:border-white w-fit"
                    key={index}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-white font-medium text-xl">Company</h1>
            <div className="flex flex-col gap-1">
              <p className="text-white">Find The Nearest Location To You</p>
              <a
                href=""
                className="text-white border-b-2 border-black hover:border-white w-fit"
              >
                Find
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-3  md:items-center md:flex-row md:justify-between ">
          <div className="text-white ">CopyRight 2024, All Rights Reserved</div>
          <Button
            className="hover:bg-white hover:text-black w-fit bg-black text-white text-start
          "
          >
            Admin Login
          </Button>
        </div>
      </div>
    </div>
  );
};
