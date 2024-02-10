import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainLayout } from "./pages/main/main.layout";
import { Home } from "./pages/home/home";
import { About } from "./pages/about/about";
import { Cart } from "./pages/cart/main/cart";
import { Contact } from "./pages/contact/contact";
import { Shop } from "./pages/shop/main/shop";
import { Toaster } from "@/components/ui/sonner";

import ScrollToTop from "./scroll.to.top";
import { ProductInfo } from "./pages/shop/product/product.info";
import { Payment } from "./pages/cart/payment/payment";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="cart">
                <Route index element={<Cart />} />
                <Route path="payment" element={<Payment />} />
              </Route>
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
