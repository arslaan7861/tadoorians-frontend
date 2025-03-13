"use client";
import React from "react";
import {
  ChartNoAxesCombined,
  ChefHat,
  IndianRupee,
  Utensils,
} from "lucide-react";
import Link from "next/link";
const menuItems = [
  { icon: IndianRupee, label: "price" },
  { icon: Utensils, label: "table" },
  { icon: ChefHat, label: "kitchen" },
  { icon: ChartNoAxesCombined, label: "history" },
];

function MobileSidebar() {
  return (
    <>
      <div className="md:hidden block w-full z-10 h-16 bg-background border-t p-4">
        <div className="grid grid-cols-4 h-full">
          {menuItems.map((item) => (
            <Link
              href={"/admin/" + item.label}
              key={item.label}
              className="flex flex-col items-center justify-center gap-1 text-secondaryTextColor hover:text-accentColor"
            >
              <item.icon className="w-5 h-5 " />
              <span className="text-xs capitalize">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default MobileSidebar;
