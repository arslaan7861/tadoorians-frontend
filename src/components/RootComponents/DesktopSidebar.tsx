import React from "react";
import {
  ChartNoAxesCombined,
  ReceiptText,
  ChefHat,
  IndianRupee,
} from "lucide-react";
const menuItems = [
  { icon: ReceiptText, label: "Bill" },
  { icon: IndianRupee, label: "Price" },
  { icon: ChefHat, label: "Kitchen" },
  { icon: ChartNoAxesCombined, label: "History" },
];
function DesktopSidebar() {
  return (
    <>
      <aside className="hidden w-64 md:block border-r border-bordercolor bg-background ">
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  className="flex items-center w-full p-2 rounded-lg text-secondaryTextColor hover:text-accentColor"
                  style={{ height: "40px" }}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default DesktopSidebar;
