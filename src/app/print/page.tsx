import BillModel from "@/DB/billSchema";
import React from "react";
import PrintComponent from "./printComponent";
import connectDB from "@/DB";

async function PrintPage({
  searchParams,
}: {
  searchParams: Promise<{ tablestamp: string }>;
}) {
  const { tablestamp } = await searchParams;
  console.log({ tablestamp });

  await connectDB();
  const bill = await BillModel.findOne({ tablestamp }).lean();
  if (!bill) return <></>;
  console.log({ bill });

  const {
    amountPayable,
    credited,
    customerName,
    discount,
    paymentMethod,
    tableId,
    timestamp,
    totalAmount,
    totalDishes,
  } = bill;
  const billcontent = bill.billcontent.map(({ _id, ...rest }) => {
    return rest;
    console.log(_id);
  });
  return (
    <div className="bg-white w-screen h-svh fixed top-0 z-50">
      <PrintComponent
        bill={{
          amountPayable,
          billcontent,
          credited,
          customerName,
          discount,
          paymentMethod,
          tableId,
          tablestamp: Number(tablestamp),
          timestamp,
          totalAmount,
          totalDishes,
        }}
      />
    </div>
  );
}

export default PrintPage;
