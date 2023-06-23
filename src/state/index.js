import globalSlice from "./globalSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    global: globalSlice,
  },
});
