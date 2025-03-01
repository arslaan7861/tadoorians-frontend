"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/State";
import CategorySelectNav from "../../../components/TableComponents/CategorySelectNav";
import BillInfo from "@/components/TableComponents/BilInfo";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IndianRupee, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    size: string,
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
    <div className="text-textColor min-h-full flex flex-col items-center w-full max-h-full ">
      <CategorySelectNav
        table={table}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full overflow-y-auto scrollbar-none p-4 ">
        {table.OrderDetails.filter(
          (item) => item.category === selectedCategory
        ).map((item, index) => (
          <Card
            key={index}
            className="flex p-0 overflow-clip gap-2 h-32 items-center"
          >
            <CardDescription className="w-24  h-full relative">
              <Image
                src={"/images/placeholder.jpg"}
                fill={true}
                className="object-cover"
                alt={item.name}
              />
            </CardDescription>
            <section className=" flex-grow h-min flex flex-col p-2 gap-2 items-start">
              <CardTitle className=" p-0 border-b w-full text-center">
                {item.name}
              </CardTitle>
              <CardContent className="flex flex-grow w-full items-center justify-start gap-2 p-0 text-muted-foreground">
                <article className="text-sm w-min  flex flex-col gap-1">
                  {Object.entries(item.sizes).map(
                    ([size, { price, quantity }]) => (
                      <span key={size} className="capitalize">
                        {size}
                      </span>
                    )
                  )}
                </article>
                <article className="text-sm w-min  flex flex-col gap-1">
                  {Object.entries(item.sizes).map(([size, { price }]) => (
                    <strong key={size}>₹{price}</strong>
                  ))}
                </article>
                <article className="text-sm w-min  flex flex-grow flex-col gap-1">
                  {Object.entries(item.sizes).map(([size, { quantity }]) => (
                    <span
                      key={size}
                      className="flex items-center w-full justify-evenly"
                    >
                      <Button
                        asChild
                        size={"icon"}
                        className="h-6 p-1"
                        variant={"outline"}
                        onClick={() => {
                          if (quantity > 0)
                            increase(item.name, size, quantity - 1);
                        }}
                        disabled={quantity <= 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      {quantity}
                      <Button
                        asChild
                        size={"icon"}
                        className="h-6 p-1"
                        variant={"outline"}
                        onClick={() => increase(item.name, size, quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </span>
                  ))}
                </article>
              </CardContent>
            </section>
            {/* <CardFooter></CardFooter> */}
          </Card>
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
