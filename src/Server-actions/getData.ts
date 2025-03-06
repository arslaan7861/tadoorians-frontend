"use server";
import connectDB from "@/DB";
import TableModel from "@/DB/tableData";
import { getEmptyMenu } from "./menuFunctions";
export async function EmptyTableOnServer(tableId: string) {
  try {
    console.log("empty table function");
    const table = await TableModel.findOne({ tableId });
    if (!table) return console.log("table not found");
    table.OrderDetails = await getEmptyMenu();
    console.log(table.OrderDetails.length);
    table.totalAmount = 0;
    table.totalDishes = 0;
    table.save();
    console.log({ set: table.OrderDetails.length });

    return JSON.stringify({ table, ok: true });
  } catch (error) {
    return JSON.stringify({ ok: false });
    console.log(error);
  }
}

export async function getTablesData() {
  try {
    console.log("getting tables data");
    //get data from database return it
    await connectDB();
    const table = await TableModel.find();
    console.log({ get: table[0].OrderDetails.length });
    return JSON.stringify(table);
  } catch (error) {
    console.log(error);
  }
}
