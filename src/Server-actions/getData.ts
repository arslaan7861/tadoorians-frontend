"use server";
import connectDB from "@/DB";
import TableModel from "@/DB/tableData";

export async function getMenu() {
  console.log("getting data");

  return "hello";
}
export async function populateTables() {
  try {
  } catch (error) {
    console.log("Error while populating tables:", error);
  }
}

export async function getTablesData() {
  try {
    console.log("getting tables data");
    //get data from database return it
    await connectDB();
    //*code to insert initial tables
    // await TableModel.deleteMany();
    // const tables = await TableModel.create([
    //   ...Object.values(initialState.tables),
    // ]);
    const table = await TableModel.find();
    console.log(table[0].OrderDetails[0].sizes);
    return JSON.stringify(table);
  } catch (error) {
    console.log(error);
  }
}
