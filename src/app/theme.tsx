"use client";
import React from 'react'
import { useAppSelector } from "@/redux/hooks";

type Props = {
  children?: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  
  const theme = useAppSelector((state) => state.themeReducer.value);
  
  return (
    <div className={theme}>
      {children}
    </div>
  )
}
