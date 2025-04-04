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
  const safeBill = {
    ...bill,
    _id: JSON.stringify(bill._id), // convert ObjectId to string
    billcontent:
      bill.billcontent?.map((item) => ({
        ...item,
        _id: JSON.stringify(bill._id), // convert ObjectId to string
      })) ?? [],
  };

  return (
    <div className="bg-white w-screen h-svh fixed top-0 z-50">
      <PrintComponent bill={safeBill} />
    </div>
  );
}

export default PrintPage;
