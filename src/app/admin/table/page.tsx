"use client";

import { Utensils } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/State";

export default function RestaurantTables() {
  const { tables } = useSelector((state: RootState) => state.tables);

  return (
    <div className="bg-background text-textColor flex flex-col items-center justify-center w-full overflow">
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full justify-center items-center p-4">
        {Object.entries(tables).map(([number, data]) => (
          <Link
            href={`/admin/${number}`}
            key={number}
            className="w-full h-40 flex flex-col items-center justify-center text-textColor font-bold text-lg rounded-lg shadow-lg border border-bordercolor transition-all duration-300  hover:text-accentColor hover:border-accentColor p-4"
          >
            <div className="flex flex-col items-center text-2xl font-extrabold mb-2">
              <span>Table {number}</span>
            </div>
            <div className="flex justify-evenly items-center w-full px-2 text-sm">
              <div className="flex items-center gap-1">
                <span>₹{data.totalAmount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Utensils className="w-4 h-4" />
                <span>{data.totalDishes} Dishes</span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
