"use client";

import { Calculator, Utensils, X } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/State";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RestaurantTables() {
  const { tables } = useSelector((state: RootState) => state.tables);

  return (
    <div className="bg-background text-textColor flex flex-col items-center justify-center w-full overflow">
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full justify-center items-center p-4">
        {Object.entries(tables).map(([number, data]) => (
          <Card
            key={number}
            className="hover:border-ring hover:scale-105 transition-transform relative"
          >
            <Link
              href={`${number}`}
              className="block absolute w-full h-full"
            ></Link>
            <CardHeader className="items-center">
              <CardTitle className="font-bold text-lg">
                Table {number}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-evenly flex-col gap-2 ">
              <section className="flex items-center gap-1 text-xs md:text-sm">
                <span className="flex w-full justify-between">
                  Bill: <strong className="flex">₹{data.totalAmount}</strong>
                </span>
              </section>
              <section className="flex items-center gap-1 text-xs md:text-sm">
                <span className="flex w-full justify-between">
                  Dishes:
                  <strong className="flex items-center gap-1">
                    <Utensils className="w-4 h-4" />
                    {data.totalDishes}
                  </strong>
                </span>
              </section>
            </CardContent>

            <CardFooter className="justify-evenly gap-2">
              <Button
                className="z-20"
                variant="detructiveOutline"
                onClick={() => console.log("Close action triggered")}
              >
                <X />
              </Button>
              <Button
                className="z-20"
                variant="outline"
                onClick={() => console.log("Calculator action triggered")}
              >
                <Calculator />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
