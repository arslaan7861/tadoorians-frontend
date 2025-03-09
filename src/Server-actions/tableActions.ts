"use server";

import TableModel from "@/DB/tableData";
import { tableType } from "@/utils/types";
import { EmptyTableOnServer } from "./getData";
import connectDB from "@/DB";

export async function addServerTable(tableId: string) {
  try {
    const newTable: tableType = {
      tableId,
      lastUpdated: 0,
      OrderDetails: [],
      totalAmount: 0,
      totalDishes: 0,
    };
    await connectDB();
    const { tableId: id, _id } = await TableModel.create(newTable);
    const resp = await EmptyTableOnServer(id);
    const { table } = JSON.parse(resp);

    // console.log({ table });
    return JSON.stringify(table);
  } catch (error) {
    console.log(error);
  }
}
export async function removedServerTable(tableId: string) {
  try {
    await connectDB();
    const res = await TableModel.deleteOne({ tableId });
    // const resp = await EmptyTableOnServer(id);
    // const { table } = JSON.parse(resp);
    console.log({ res });

    // console.log({ table });
    return JSON.stringify({ ok: true, message: "Removed table" + tableId });
  } catch (error) {
    return JSON.stringify({
      ok: false,
      message: "Failed to removed table" + tableId,
    });
    console.log(error);
  }
}
