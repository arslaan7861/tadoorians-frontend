import { ITable } from "@/utils/types";
import mongoose, { Schema, Model } from "mongoose";
import { DishSchema } from "./MenuModel";

// Define the Mongoose Schema with generic type ITable
const TableSchema: Schema<ITable> = new Schema({
  tableId: { type: String, unique: true },
  totalAmount: { type: Number, default: 0 },
  totalDishes: { type: Number, default: 0 },
  OrderDetails: [DishSchema],
  lastUpdated: { type: Number, default: 0 },
});

// Create and export the model with proper typings
const TableModel: Model<ITable> =
  mongoose.models.Table || mongoose.model<ITable>("Table", TableSchema);

export default TableModel;
