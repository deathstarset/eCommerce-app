import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainLayout } from "./pages/main.layout";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { Cart } from "./pages/cart/cart";
import { Contact } from "./pages/contact";
import { Shop } from "./pages/shop/shop";
import { Toaster } from "@/components/ui/sonner";

import ScrollToTop from "./scroll.to.top";
import { ProductInfo } from "./pages/shop/product/product.info";
export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="cart" element={<Cart />} />
              <Route path="contact" element={<Contact />} />
              <Route path="shop">
                <Route index element={<Shop />} />
                <Route path=":productId" element={<ProductInfo />} />
              </Route>
            </Route>
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
      <Toaster />
    </div>
  );
};
