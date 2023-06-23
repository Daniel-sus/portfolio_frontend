import { createSlice } from "@reduxjs/toolkit";
import { getThemeFromLS } from "../hooks/getThemeFromLS";

const initialState = {
  mode: getThemeFromLS(),
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
