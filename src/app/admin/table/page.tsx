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
          <Link key={number} href={`${number}`}>
            <Card className="hover:border-ring hover:scale-105 transition-transform">
              <CardHeader className="items-center">
                <CardTitle>Table{number}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-evenly">
                <section className="flex items-center gap-1">
                  <span>Bill: ₹{data.totalAmount}</span>
                </section>
                <section className="flex items-center gap-1">
                  <Utensils className="w-4 h-4" />
                  <span>Dishes: {data.totalDishes} </span>
                </section>
              </CardContent>
              <CardFooter className="justify-evenly">
                <Button variant={"detructiveOutline"}>
                  <X />
                </Button>
                <Button variant={"outline"}>
                  <Calculator />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
