import { tableType } from "@/utils/types";
import React, { SetStateAction } from "react";
interface propsType {
  table: tableType;
  selectedCategory: string;
  setSelectedCategory: (value: SetStateAction<string>) => void;
}
function CategorySelectNav({
  table,
  selectedCategory,
  setSelectedCategory,
}: propsType) {
  return (
    <nav className="w-full absolute top-0 z-10 bg-background max-w-full text-textColor flex gap-3">
      {[...new Set(table.OrderDetails.map((i) => i.category))].map(
        (category) => (
          <button
            key={category}
            className={`px-4 py-2 text-sm font-medium transition-all h-full border-b-2 ${
              selectedCategory === category
                ? "border-accentColor text-accentColor"
                : "border-transparent"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        )
      )}
    </nav>
  );
}

export default CategorySelectNav;
