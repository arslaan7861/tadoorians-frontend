"use client";
import { RootState } from "@/State";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function ToastProvider() {
  const toasts = useSelector((state: RootState) => state.toast);
  useEffect(() => {
    console.log({ toasts });
  }, []);

  return <></>;
}

export default ToastProvider;
