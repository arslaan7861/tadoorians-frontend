"use server";
import connectDB from "@/DB";
import TableModel from "@/DB/tableModel";

export async function getTablesData() {
  try {
    console.log("getting tables data");
    //get data from database return it
    await connectDB();
    const table = await TableModel.find();
    console.log("served tables data");

    return JSON.stringify(table);
  } catch (error) {
    console.log(error);
  }
}
