"use client";

import { Utensils } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/State";

export default function RestaurantTables() {
  const { tables } = useSelector((state: RootState) => state.tables);

  return (
    <div className="bg-background text-textColor flex flex-col items-center justify-center w-full overflow">
      Admin homepage
    </div>
  );
}
