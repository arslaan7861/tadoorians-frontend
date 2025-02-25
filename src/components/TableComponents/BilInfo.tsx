import React, { useState } from "react";
import RestaurantBillCard from "./Billcards";
import { tableType } from "@/utils/types";
import { useDispatch } from "react-redux";
import { updateTable } from "@/State/Tables";
import { calculateAmountAndDishes } from "@/utils/tableFunctions";
import { AppDispatch } from "@/State";
interface propsType {
  table: tableType;
}
function BillInfo({ table }: propsType) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const updateOrder = () => {
    const { totalAmount, totalDishes } = calculateAmountAndDishes(table);
    console.log("updating table");
    dispatch(
      updateTable({
        ...table,
        totalAmount,
        totalDishes,
        lastUpdated: table.lastUpdated + 1,
      })
    );
  };
  return (
    <>
      <section className="absolute bottom-0 px-6 w-full h-16 flex justify-between items-center border-t border-bordercolor bg-background">
        <article className="text-lg">
          Total dishes : {table.totalDishes}
        </article>
        <article className="flex gap-5 items-center text-lg">
          <button
            onClick={updateOrder}
            className="text-lg text-accentColor border border-accentColor px-4 py-1 rounded-md"
          >
            Update order
          </button>
          <span>Total Bill :</span>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-accentColor h-min text-white px-4 py-1 rounded-md text-lg shadow-lg hover:scale-105 transition-transform"
          >
            ₹{table.totalAmount}
          </button>
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
