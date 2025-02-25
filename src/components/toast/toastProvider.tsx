"use client";
import { RootState } from "@/State";
import { removeToast } from "@/State/toast";
import { toastType } from "@/utils/types";
import { CheckCircle2, XCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ToastProvider() {
  const toasts = useSelector((state: RootState) => state.toast);
  useEffect(() => {
    console.log({ toasts });
  }, []);
  if (toasts.length === 0) return <></>;

  return (
    <article className="h-min z-50 w-full right-0 top-0 flex flex-col gap-2  md:w-96 absolute px-4 py-6">
      {toasts.map((toast) => (
        <Toast toastData={toast} key={toast.timestamp} />
      ))}
    </article>
  );
}
const Toast = ({ toastData }: { toastData: toastType }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeToast(toastData.timestamp));
    }, toastData.timestamp + 3000 - Date.now());
  }, []);
  const Icon = {
    success: CheckCircle2,
    error: XCircle,
  }[toastData.status];
  const bgColor = {
    success: "bg-green-600",
    error: "bg-red-600",
    loading: "bg-yellow-500",
  }[toastData.status];

  return (
    <aside
      className={` text-sm md:text-lg  capitalize py-4 flex items-center gap-3 ${bgColor} text-white px-4 rounded-lg shadow-lg`}
      role="status"
      aria-live="polite"
    >
      <Icon />
      <span className="font-semibold">{toastData.message}</span>
    </aside>
  );
};

export default ToastProvider;
