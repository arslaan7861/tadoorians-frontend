import React, { SetStateAction, useState } from "react";
import RestaurantBillCard from "./Billcard";
import { tableType } from "@/utils/types";
import { useDispatch } from "react-redux";
import { updateTable } from "@/State/Tables";
import { calculateAmountAndDishes } from "@/utils/tableFunctions";
import { AppDispatch } from "@/State";
import { Download, LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface propsType {
  table: tableType;
  isUpdated: boolean;
  setIsupdated: (value: SetStateAction<boolean>) => void;
}
function BillInfo({ table, isUpdated, setIsupdated }: propsType) {
  const dispatch = useDispatch<AppDispatch>();
  const [isUpdating, setIsUpdating] = useState(false);
  const updateOrder = async () => {
    const { totalAmount, totalDishes } = calculateAmountAndDishes(table);
    console.log("updating table");
    setIsUpdating(true);
    await dispatch(
      updateTable({
        ...table,
        totalAmount,
        totalDishes,
        lastUpdated: table.lastUpdated + 1,
      })
    );
    setIsUpdating(false);
    setIsupdated(true);
    console.log("updated");
  };
  return (
    <>
      <section className="px-6 w-full p-2 h-16 flex justify-between items-center border-t self-end">
        <span className="hidden md:block text-lg text-muted-foreground">
          Total dishes : <strong>{table.totalDishes}</strong>
        </span>
        <article className="flex flex-grow sm:flex-grow-0 gap-5 justify-between items-center text-sm md:text-lg">
          {!isUpdated && (
            <Button
              variant={"secondary"}
              disabled={isUpdated || isUpdating}
              onClick={updateOrder}
            >
              {isUpdating ? (
                <>
                  {" "}
                  <LoaderCircle className="animate-spin text-xs" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Download className="text-xs" /> <span> Save order</span>
                </>
              )}
            </Button>
          )}
          <Dialog>
            <span className="text-muted-foreground">Total Bill :</span>
            <DialogTrigger asChild>
              <Button>₹{table.totalAmount}</Button>
            </DialogTrigger>
            <RestaurantBillCard table={table} />
          </Dialog>
        </article>
      </section>
      {/* Bill card  */}
    </>
  );
}

export default BillInfo;
