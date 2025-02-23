"use server";

import connectDB from "@/DB";
import TableModel from "@/DB/tableData";
import { initialState } from "@/State/Tables";

export async function getMenu() {
  console.log("getting data");

  return "hello";
}
export async function populateTables() {
  try {
    await TableModel.deleteMany();
    for (const [id, data] of Object.entries(initialState.tables)) {
      const tab = await TableModel.create({ ...data });
      console.log({ tab: tab._id, id: tab.tableId });
    }
    console.log("created successfully");
  } catch (error) {
    console.log("Error while populating tables:", error);
  }
}

export async function getTablesData() {
  try {
    console.log("getting tables data");
    //get data from database return it
    await connectDB();
    const tables = await TableModel.find();
    console.log(tables.length);
    return JSON.stringify(tables);
  } catch (error) {
    console.log(error);
  }
}
