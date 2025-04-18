"use client";

import { Calculator, Plus, Trash, Utensils, X } from "lucide-react";
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
import { addTable, EmptyTable, removeTable } from "@/State/Tables";
import Billcard from "@/components/TableComponents/Billcard";
import { calculateAmountAndDishes } from "@/utils/tableFunctions";
import { updateBill } from "@/State/bill";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useRouter, useSearchParams } from "next/navigation";

export default function RestaurantTables() {
  const { tables } = useSelector((state: RootState) => state.tables);
  const dispatch = useDispatch<AppDispatch>();
  const searchparams = useSearchParams();
  const SheetId = searchparams.get("sheet");
  const [newTableName, setNewTableName] = useState("");
  function addNewTable() {
    if (!newTableName.length) return toast.error("Please enter table name");
    const tableId = newTableName.split(" ").join("_");
    dispatch(addTable(tableId));
    setNewTableName("");
  }
  const router = useRouter();

  const handleOpenChange = (open: boolean, tableId: string) => {
    const url = new URL(window.location.href);
    if (open) {
      url.searchParams.set("sheet", tableId);
    } else {
      url.searchParams.delete("sheet");
    }
    router.push(url.toString(), { scroll: false });
  };
  return (
    <div className="bg-background text-textColor flex flex-col items-center justify-center w-full overflow">
      {
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full justify-center items-center p-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              {Object.entries(tables).length === 0 ? (
                <Card
                  className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2
                 left-1/2 h-full w-full flex items-center justify-center flex-col text-2xl font-extrabold rounded-none border-none bg-background"
                >
                  <p>No tables</p>
                  <p>Tap to add</p>
                </Card>
              ) : (
                <Card className="h-full w-full flex items-center justify-center capitalize ">
                  <Plus />
                  Add Table
                </Card>
              )}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add new table</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    value={newTableName}
                    onChange={(e) => setNewTableName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addNewTable();
                    }}
                  ></Input>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button onClick={addNewTable}>Add</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {Object.entries(tables).map(([number, data]) => (
            <Card
              key={number}
              className="hover:border-ring hover:scale-105 transition-transform relative"
            >
              <Link
                href={`${number}`}
                className="block absolute w-full h-full"
              ></Link>
              <AlertDialog>
                <AlertDialogTrigger
                  asChild
                  className="absolute right-0 text-destructive top-0"
                >
                  <Button
                    variant={"ghost"}
                    className="hover:bg-transparent hover:scale-110 hover:text-destructive"
                  >
                    <Trash />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Table {number}?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      table {number} and clear its orders.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => dispatch(removeTable(number))}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <CardHeader className="items-center">
                <CardTitle>Table {number} </CardTitle>
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
                      variant="destructiveOutline"
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
                        This action cannot be undone. This will permanently
                        delete table orders
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

                <Sheet
                  open={!!SheetId && SheetId === data.tableId}
                  onOpenChange={(d) => handleOpenChange(d, data.tableId)}
                  defaultOpen={false}
                >
                  <SheetTrigger
                    onClick={() => handleOpenChange(true, data.tableId)}
                    asChild
                  >
                    <Button
                      className="z-20"
                      variant="outline"
                      disabled={data.totalAmount == 0}
                      onClick={() => {
                        const { bill } = calculateAmountAndDishes(data);
                        dispatch(
                          updateBill({ ...bill, tablestamp: data.tablestamp })
                        );
                      }}
                    >
                      <Calculator />
                    </Button>
                  </SheetTrigger>
                  <Billcard table={data} />
                </Sheet>
              </CardFooter>
            </Card>
          ))}
        </section>
      }
    </div>
  );
}
