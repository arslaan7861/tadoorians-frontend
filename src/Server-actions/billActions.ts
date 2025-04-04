"use server";
import connectDB from "@/DB";
import BillModel from "@/DB/billSchema";
import { BillType } from "@/utils/types";

export async function saveBillServer(bill: BillType) {
  try {
    // await BillModel.deleteMany({});
    bill.customerName = bill.customerName ? bill.customerName : "Anonymous";
    console.log(bill.tablestamp);
    await connectDB();
    await BillModel.updateOne(
      { tablestamp: bill.tablestamp }, // Search for existing bill by tablestamp
      { $set: { ...bill } }, // Update or insert the dish
      { upsert: true } // If the dish doesn't exist, insert it
    );
    return JSON.stringify({ ok: true, message: "Saved bill" });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ ok: false, message: "Unable to Save bill..." });
  }
}
export async function settleCreditServer(tablestamp: number) {
  try {
    await connectDB();
    console.log({ tablestamp });
    const updatedBill = await BillModel.findOneAndUpdate(
      { tablestamp: tablestamp },
      { credited: false },
      { new: true } // <-- returns the updated document
    );
    console.log({ updatedBill });

    if (!updatedBill)
      return { status: false, message: "No Credit in the record" };
    return { status: true, message: "Removed Credit from record" };
  } catch (error) {
    console.log({ errorSettleBill: error });
    return { status: false, message: "Something went wrong" };
  }
}
