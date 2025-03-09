"use server";

import TableModel from "@/DB/tableModel";
import { tableType } from "@/utils/types";
import connectDB from "@/DB";
import { getEmptyMenu } from "./menuFunctions";
export async function EmptyTableOnServer(tableId: string) {
  try {
    await connectDB();
    console.log("cleaning table ", tableId);
    const table = await TableModel.findOne({ tableId });
    if (!table) return JSON.stringify({ ok: false });
    table.OrderDetails = await getEmptyMenu();
    table.totalAmount = 0;
    table.totalDishes = 0;
    table.save();
    console.log("cleaned table ", tableId);

    return JSON.stringify({ table, ok: true });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ ok: false });
  }
}

export async function addServerTable(tableId: string) {
  try {
    console.log("adding table", tableId);

    const newTable: tableType = {
      tableId,
      OrderDetails: [],
      totalAmount: 0,
      totalDishes: 0,
      tablestamp: Date.now(),
    };
    await connectDB();
    const { tableId: id } = await TableModel.create(newTable);
    const resp = await EmptyTableOnServer(id);
    const { table } = JSON.parse(resp);
    console.log("added table", tableId);
    return JSON.stringify({
      ...table,
      tablestamp: new Date(table.updatedAt)?.getTime() as number,
    });
  } catch (error) {
    console.log(error);
  }
}
export async function removedServerTable(tableId: string) {
  try {
    console.log("removing table", tableId);

    await connectDB();
    await TableModel.deleteOne({ tableId });
    // const resp = await EmptyTableOnServer(id);
    // const { table } = JSON.parse(resp);
    console.log("removed table", tableId);

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
