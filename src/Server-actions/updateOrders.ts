"use server";

import connectDB from "@/DB";
import TableModel from "@/DB/tableData";
import { tableType } from "@/utils/types";
import mongoose from "mongoose";

export async function UpdateServerTable(
  table: tableType
): Promise<{ ok: boolean }> {
  try {
    await connectDB();
    const tableData = await TableModel.findOneAndUpdate(
      { tableId: table.tableId },
      { ...table },
      { new: true }
    );
    console.log(tableData.OrderDetails[0].sizes);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false };
  } finally {
    mongoose.disconnect();
  }
}
