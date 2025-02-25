import { tableType } from "@/utils/types";
import mongoose, { Schema } from "mongoose";
import { DishSchema } from "./MenuModel";

// Define the Mongoose Schema
const TableSchema: Schema = new Schema({
  tableId: { type: String, unique: true },
  totalAmount: { type: Number, default: 0 },
  totalDishes: { type: Number, default: 0 },
  OrderDetails: [DishSchema],
  lastUpdated: { type: Number, default: 0 },
});
interface TableSchemaType extends Document, tableType {}
// Export the model
const TableModel =
  mongoose.models.Table ||
  mongoose.model<TableSchemaType>("Table", TableSchema);
export default TableModel;
