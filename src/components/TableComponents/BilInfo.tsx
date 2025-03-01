import React, { SetStateAction, useState } from "react";
import RestaurantBillCard from "./Billcards";
import { tableType } from "@/utils/types";
import { useDispatch } from "react-redux";
import { updateTable } from "@/State/Tables";
import { calculateAmountAndDishes } from "@/utils/tableFunctions";
import { AppDispatch } from "@/State";
import { Download, LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
interface propsType {
  table: tableType;
  isUpdated: boolean;
  setIsupdated: (value: SetStateAction<boolean>) => void;
}
function BillInfo({ table, isUpdated, setIsupdated }: propsType) {
  const [isOpen, setIsOpen] = useState(false);
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
              variant={"outline"}
              disabled={isUpdated || isUpdating}
              onClick={updateOrder}
            >
              <span> Save order</span>
              {isUpdating ? (
                <LoaderCircle className="animate-spin text-xs" />
              ) : (
                <Download className="text-xs" />
              )}
            </Button>
          )}
          <section className="flex ml-auto items-center gap-2">
            <span>Total Bill :</span>
            <Button onClick={() => setIsOpen(true)}>
              ₹{table.totalAmount}
            </Button>
          </section>
        </article>
      </section>
      {/* Bill card  */}
      <div
        className={`${
          isOpen ? "fixed" : "hidden"
        } h-svh w-svw z-20 backdrop-blur-sm bg-transparent flex items-center justify-center top-0 left-0`}
      >
        <div
          onClick={() => setIsOpen(false)}
          className="z-20 w-full bg-[rgba(0,0,0,0.2)] h-full absolute top-0 left-0"
        ></div>
        <RestaurantBillCard />
      </div>
    </>
  );
}

export default BillInfo;
