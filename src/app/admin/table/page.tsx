"use client";

import { Calculator, Utensils, X } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/State";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyTable } from "@/State/Tables";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import Billcard from "@/components/TableComponents/Billcard";
import { calculateAmountAndDishes } from "@/utils/tableFunctions";
import { updateBill } from "@/State/bill";
import { useState } from "react";

export default function RestaurantTables() {
  const { tables } = useSelector((state: RootState) => state.tables);
  const dispatch = useDispatch<AppDispatch>();
  const [isopen, setIsOPen] = useState("");
  if (Object.entries(tables).length == 0) return <></>;

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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="z-20"
                    disabled={data.totalAmount == 0}
                    variant="detructiveOutline"
                    // onClick={() => dispatch(EmptyTable(number))}
                  >
                    <X />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      table orders
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
                      onClick={() => dispatch(EmptyTable(number))}
                    >
                      Clear
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Dialog
                open={isopen === number}
                onOpenChange={() => setIsOPen(number)}
              >
                <DialogTrigger asChild>
                  <Button
                    className="z-20"
                    variant="outline"
                    disabled={data.totalAmount == 0}
                    onClick={() => {
                      const { bill } = calculateAmountAndDishes(data);
                      dispatch(updateBill(bill));
                    }}
                  >
                    <Calculator />
                  </Button>
                </DialogTrigger>
                <Billcard setIsOPen={setIsOPen} table={data} />
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
