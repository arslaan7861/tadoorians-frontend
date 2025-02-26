"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/State";
import CategorySelectNav from "../../../components/TableComponents/CategorySelectNav";
import BillInfo from "@/components/TableComponents/BilInfo";
import Image from "next/image";

export default function RestaurantMenu({ tableId }: { tableId: string }) {
  const { tables } = useSelector((state: RootState) => state.tables);
  const [selectedCategory, setSelectedCategory] = useState<string>("Starter");
  const [table, setTable] = useState(tables[tableId]);
  const [isUpdated, setIsupdated] = useState(true);
  useEffect(() => {
    console.log("setting tables");
    setTable(tables[tableId]);
  }, [tables, tableId]);

  function increase(
    name: string, // Assuming each order has a unique 'id'
    size: "quarter" | "half" | "full",
    quantity: number
  ) {
    setIsupdated(false);
    setTable((oldState) => {
      const newState = { ...oldState };
      newState.OrderDetails = oldState.OrderDetails.map((order) => {
        if (order.name === name) {
          // Adjust totalDishes by removing the previous quantity first
          newState.totalDishes -= order.sizes[size].quantity;

          // Update the order with the new quantity
          const updatedOrder = {
            ...order,
            sizes: {
              ...order.sizes,
              [size]: {
                ...order.sizes[size],
                quantity: quantity,
              },
            },
          };

          // Adjust totalDishes with the new quantity
          newState.totalDishes += quantity;

          return updatedOrder;
        }
        return order;
      });

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
        {table.OrderDetails.filter(
          (item) => item.category === selectedCategory
        ).map((item, index) => (
          <article
            key={index}
            className="p-4 border border-bordercolor shadow-sm hover:shadow-xl transition-all flex flex-col items-center rounded-md"
          >
            <article className="mb-3 w-full h-40 relative">
              <Image
                src={"/images/placeholder.jpg"}
                alt={item.name}
                fill
                className="w-full rounded-md h-40 object-cover"
                loading="lazy"
              />
            </article>
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
                          item.name,
                          size as "quarter" | "half" | "full",
                          quantity <= 0 ? 0 : quantity - 1
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
                          item.name,
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
      <BillInfo
        isUpdated={isUpdated}
        setIsupdated={setIsupdated}
        table={table}
      />
    </div>
  );
}
