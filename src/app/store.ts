import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./services/products.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import productsReducer from "./features/products.slice";
export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
