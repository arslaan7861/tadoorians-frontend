"use client";
import React from "react";
import tableReducer from "@/State/Tables";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

export const store = configureStore({
  reducer: {
    tables: tableReducer,
  },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;

function StateProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}

export default StateProvider;
