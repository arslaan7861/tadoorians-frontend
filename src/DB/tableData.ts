import { tableType } from "@/utils/types";
import mongoose, { Schema } from "mongoose";
import { DishSchema } from "./MenuModel";

// Define the Mongoose Schema
const TableSchema: Schema = new Schema({
  tableId: String,
  totalAmount: { type: Number, default: 0 },
  totalDishes: { type: Number, default: 0 },
  OrderDetails: [DishSchema],
});
interface TableSchemaType extends Document, tableType {}
// Export the model
const TableModel =
  mongoose.models.Table ||
  mongoose.model<TableSchemaType>("Table", TableSchema);
export default TableModel;
