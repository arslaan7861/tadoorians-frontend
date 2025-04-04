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
      { $set: bill }, // Update or insert the dish
      { upsert: true } // If the dish doesn't exist, insert it
    );
    return JSON.stringify({ ok: true, message: "Saved bill" });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ ok: false, message: "Unable to Save bill..." });
  }
}
