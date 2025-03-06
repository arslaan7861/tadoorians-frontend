"use server";

import connectDB from "@/DB";
import TableModel from "@/DB/tableData";
import { tableType } from "@/utils/types";

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

    return { ok: !!tableData };
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
}
