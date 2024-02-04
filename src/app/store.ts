import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./services/products.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from "./features/cart.slice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
