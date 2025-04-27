import React from "react";
import {
  ChartAreaIcon,
  ChartNoAxesCombined,
  IndianRupee,
  Utensils,
} from "lucide-react";
import Link from "next/link";
const menuItems = [
  { icon: Utensils, label: "table", url: "/table" },
  { icon: IndianRupee, label: "price", url: "/price" },
  { icon: ChartNoAxesCombined, label: "history", url: "/history" },
  { icon: ChartAreaIcon, label: "analytics", url: "/analytics" },
];
function DesktopSidebar() {
  return (
    <>
      <aside className="hidden w-min md:block border-r bg-background ">
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.url}>
                <Link
                  href={"/admin" + item.url}
                  className="flex items-center w-full p-2 rounded-lg text-secondaryTextColor hover:text-accentColor"
                  style={{ height: "40px" }}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="text-sm font-medium capitalize">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default DesktopSidebar;
