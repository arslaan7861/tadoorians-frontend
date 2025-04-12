import { tableType } from "@/utils/types";
import React, { SetStateAction } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
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
  const categories = [...new Set(table.OrderDetails.map((i) => i.category))];
  return (
    <>
      <nav className="hidden md:flex w-full z-10 bg-background max-w-full text-textColor gap-3">
        {categories.map((category) => (
          <Button
            variant={"ghost"}
            key={category}
            className={`hover:bg-card rounded-none ${
              selectedCategory === category
                ? "border-primary text-primary border-b"
                : "border-transparent"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </nav>
      <nav className="md:hidden flex w-full z-10 bg-background justify-evenly items-center max-w-full text-textColor gap-3">
        {[...categories].splice(0, 3).map((category) => (
          <Button
            variant={"ghost"}
            key={category}
            className={`hover:bg-card rounded-none ${
              selectedCategory === category
                ? "border-primary text-primary border-b"
                : "border-transparent"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger className="border-none shadow-none" asChild>
            <Button
              variant="outline"
              className={`flex items-center space-x-1${
                [...categories].splice(3).includes(selectedCategory)
                  ? "border-primary text-primary border-b"
                  : "border-transparent"
              }`}
            >
              {[...categories].splice(3).includes(selectedCategory)
                ? selectedCategory
                : "more"}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-max bg-card">
            {[...categories].splice(3).map((category) => (
              <DropdownMenuItem key={category}>
                <Button
                  variant={"ghost"}
                  className={`hover:bg-card rounded-none w-full justify-start ${
                    selectedCategory === category && " text-primary"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
}

export default CategorySelectNav;
