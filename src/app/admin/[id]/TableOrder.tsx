"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/State";
import CategorySelectNav from "../../../components/TableComponents/CategorySelectNav";
import BillInfo from "@/components/TableComponents/BilInfo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tableType } from "@/utils/types";
import TableLoading from "./loading";
import LargeInputs from "@/components/TableComponents/LargeInputs";

export default function RestaurantMenu({ tableId }: { tableId: string }) {
  const [mounted, setMounted] = useState(false);
  const { tables } = useSelector((state: RootState) => state.tables);
  const tablesLenValid = Object.entries(tables).length > 0;
  const [selectedCategory, setSelectedCategory] = useState<string>("Starter");
  const [table, setTable] = useState(
    tablesLenValid ? tables[tableId] : ({} as tableType)
  );
  // Ensure rendering only after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  console.log(table.tableId, table.tablestamp);

  const [isUpdated, setIsupdated] = useState(true);
  useEffect(() => {
    console.log("setting tables");
    setTable(tablesLenValid ? tables[tableId] : ({} as tableType));
  }, [tables, tableId, tablesLenValid]);

  function increase(
    name: string, // Assuming each order has a unique 'id'
    size: string,
    quantity: number,
    count: boolean
  ) {
    setIsupdated(false);
    setTable((oldState) => {
      const newState = { ...oldState };
      newState.OrderDetails = oldState.OrderDetails.map((order) => {
        if (order.name === name) {
          // Adjust totalDishes by removing the previous quantity first
          if (count) newState.totalDishes -= order.sizes[size].quantity;

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
          if (count) newState.totalDishes += quantity;

          return updatedOrder;
        }
        return order;
      });

      return newState;
    });
  }
  if (!mounted) {
    // 🔹 Skeleton rendering on first mount
    return <TableLoading></TableLoading>;
  }
  if (!tablesLenValid || !table.OrderDetails) return <></>;

  return (
    <div className="text-textColor min-h-full flex flex-col items-center w-full max-h-full ">
      <CategorySelectNav
        table={table}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <section className="w-full flex-grow overflow-y-auto sm:scrollbar-none">
        <div className="pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full overflow-y-auto md:scrollbar-none p-4 ">
          {table.OrderDetails.filter(
            (item) => item.category === selectedCategory
          ).map((item, index) => (
            <Card key={index} className="pt-2 hover:border-ring flex flex-col">
              <CardHeader className="p-2">
                <CardTitle className=" p-0 w-full text-center">
                  {item.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-grow flex-col w-full items-center gap-2 py-2 justify-center">
                {item.name == "Roti" ? (
                  <LargeInputs increase={increase} item={item}></LargeInputs>
                ) : (
                  <>
                    {Object.entries(item.sizes).map(([size, { quantity }]) => {
                      return (
                        <article
                          key={size}
                          className="flex items-center justify-between w-full text-sm"
                        >
                          <span>
                            {size} x {quantity}
                          </span>
                          <p className=" grow  justify-end gap-3 flex">
                            <Button
                              variant={"destructive"}
                              className="h-9 md:h-7 px-2 gap-0"
                              onClick={() => {
                                if (quantity > 0 && quantity < 5)
                                  return increase(
                                    item.name,
                                    size,
                                    0,
                                    item.count
                                  );
                                if (quantity > 0)
                                  increase(
                                    item.name,
                                    size,
                                    quantity - 5,
                                    item.count
                                  );
                              }}
                              disabled={quantity <= 0}
                            >
                              <Minus /> 5
                            </Button>
                            <Button
                              onClick={() => {
                                if (quantity > 0)
                                  increase(
                                    item.name,
                                    size,
                                    quantity - 1,
                                    item.count
                                  );
                              }}
                              disabled={quantity <= 0}
                              variant={"destructive"}
                              className="h-9 w-9 md:h-7 md:w-7"
                            >
                              <Minus />
                            </Button>{" "}
                            <Button
                              onClick={() => {
                                increase(
                                  item.name,
                                  size,
                                  quantity + 1,
                                  item.count
                                );
                              }}
                              className="h-9 w-9 md:h-7 md:w-7"
                            >
                              <Plus />
                            </Button>{" "}
                            <Button
                              onClick={() => {
                                increase(
                                  item.name,
                                  size,
                                  quantity + 5,
                                  item.count
                                );
                              }}
                              className="h-9 md:h-7 px-2 gap-0"
                            >
                              <Plus />5
                            </Button>
                          </p>
                        </article>
                      );
                    })}
                  </>
                )}
              </CardContent>
              {/* <CardFooter></CardFooter> */}
            </Card>
          ))}
        </div>
      </section>
      <BillInfo
        isUpdated={isUpdated}
        setIsupdated={setIsupdated}
        table={table}
      />
    </div>
  );
}
