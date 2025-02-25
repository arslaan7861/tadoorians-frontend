import React, { SetStateAction, useState } from "react";
import RestaurantBillCard from "./Billcards";
import { tableType } from "@/utils/types";
import { useDispatch } from "react-redux";
import { updateTable } from "@/State/Tables";
import { calculateAmountAndDishes } from "@/utils/tableFunctions";
import { AppDispatch } from "@/State";
import { ArrowRight, LoaderCircle } from "lucide-react";
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
      <section className="absolute bottom-0 px-6 w-full h-16 flex justify-between items-center border-t border-bordercolor bg-background">
        <article className="hidden md:block text-lg">
          Total dishes : {table.totalDishes}
        </article>
        <article className="flex flex-grow sm:flex-grow-0 gap-5 justify-between items-center text-sm md:text-lg">
          {!isUpdated && (
            <button
              disabled={isUpdated || isUpdating}
              onClick={updateOrder}
              className=" flex items-center gap-2 text-sm md:text-lg text-accentColor border border-accentColor px-4 py-1 rounded-md"
            >
              <span> Save order</span>
              {isUpdating ? (
                <LoaderCircle className="animate-spin text-xs" />
              ) : (
                <ArrowRight className="text-xs" />
              )}
            </button>
          )}
          <section className="flex ml-auto items-center gap-2">
            <span>Total Bill :</span>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-accentColor h-min text-white px-4 py-1 rounded-md text-lg shadow-lg hover:scale-105 transition-transform"
            >
              ₹{table.totalAmount}
            </button>
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
