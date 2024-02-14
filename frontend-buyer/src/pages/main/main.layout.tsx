import { Outlet } from "react-router-dom";
import { MainNavigation } from "./main.navigation";
import { MainFooter } from "./main.footer";

export const MainLayout = () => {
  return (
    <div className="pt-4 pb-0">
      <MainNavigation />
      <Outlet />
      <MainFooter />
    </div>
  );
};
