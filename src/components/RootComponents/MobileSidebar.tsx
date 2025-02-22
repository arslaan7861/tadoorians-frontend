import React from "react";
import {
  ChartNoAxesCombined,
  ReceiptText,
  ChefHat,
  IndianRupee,
} from "lucide-react";
const menuItems = [
  { icon: IndianRupee, label: "Price" },
  { icon: ReceiptText, label: "Bill" },
  { icon: ChefHat, label: "Kitchen" },
  { icon: ChartNoAxesCombined, label: "History" },
];

function MobileSidebar() {
  return (
    <>
      <div className="md:hidden w-full h-16 bg-background border-t border-bordercolor p-4">
        <div className="grid grid-cols-4 h-full">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center justify-center gap-1 text-secondaryTextColor hover:text-accentColor"
            >
              <item.icon className="w-5 h-5 " />
              <span className="text-xs ">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default MobileSidebar;
