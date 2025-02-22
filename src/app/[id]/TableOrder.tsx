"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/State";
import CategorySelectNav from "../../components/TableComponents/CategorySelectNav";
import BillInfo from "@/components/TableComponents/BilInfo";
import Image from "next/image";

export default function RestaurantMenu({ tableId }: { tableId: string }) {
  const { tables } = useSelector((state: RootState) => state.tables);
  const [selectedCategory, setSelectedCategory] = useState<string>("Starter");
  const [table, setTable] = useState(tables[tableId]);

  function increase(
    index: number,
    size: "quarter" | "half" | "full",
    quantity: number
  ) {
    setTable((oldState) => {
      const newState = { ...oldState };
      newState.totalDishes -=
        oldState.OrderDetails[selectedCategory][index].sizes[size].quantity;
      newState.OrderDetails = { ...oldState.OrderDetails };
      newState.OrderDetails[selectedCategory] = [
        ...oldState.OrderDetails[selectedCategory],
      ];
      newState.OrderDetails[selectedCategory][index] = {
        ...oldState.OrderDetails[selectedCategory][index],
        sizes: {
          ...oldState.OrderDetails[selectedCategory][index].sizes,
          [size]: {
            ...oldState.OrderDetails[selectedCategory][index].sizes[size],
            quantity: quantity,
          },
        },
      };
      newState.totalDishes += quantity;
      return newState;
    });
  }

  return (
    <div className="text-textColor flex flex-col items-center w-full max-h-full pt-6 pb-16">
      <CategorySelectNav
        table={table}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full py-2 overflow-y-auto scrollbar-none bg-background">
        {table.OrderDetails[selectedCategory].map((item, index) => (
          <article
            key={index}
            className="p-4 border border-bordercolor shadow-sm hover:shadow-xl transition-all flex flex-col items-center rounded-md"
          >
            <Image
              src={item.image}
              alt={item.name}
              className="w-full rounded-md h-40 object-cover mb-3"
            />
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <div className="grid grid-cols-3 gap-2 w-full">
              {Object.entries(item.sizes).map(([size, { price, quantity }]) => (
                <div
                  key={size}
                  className="flex flex-col items-center bg-transAccentColor text-accentColor border border-accentColor rounded-lg p-2"
                >
                  <p className="text-sm font-medium uppercase">{size}</p>
                  <p className="font-semibold">₹{price}</p>
                  <div className="flex items-center gap-2 mt-1 ">
                    <button
                      onClick={() =>
                        increase(
                          index,
                          size as "quarter" | "half" | "full",
                          quantity === 0 ? 0 : quantity - 1
                        )
                      }
                      className="px-2 py-1 "
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">{quantity}</span>
                    <button
                      onClick={() =>
                        increase(
                          index,
                          size as "quarter" | "half" | "full",
                          quantity + 1
                        )
                      }
                      className="px-2 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      <BillInfo table={table} />
    </div>
  );
}
