"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
  value: string;
};

let initialState = {
  value: "",
} as ThemeState;

export const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    reset: () => initialState,
    changeTheme: (state, action: PayloadAction<string>) => {
        state.value = action.payload
    },
  },
});

export const {
  changeTheme,
  reset,
} = theme.actions;
export default theme.reducer;