import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";
// import { userApi } from "./services/userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    themeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  // 用于异步任务
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({}).concat([userApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;