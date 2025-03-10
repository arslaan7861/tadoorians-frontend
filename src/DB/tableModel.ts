import { ITable } from "@/utils/types";
import mongoose, { Schema, Model } from "mongoose";

// Define the Mongoose Schema with generic type ITable
const TableSchema: Schema<ITable> = new Schema(
  {
    tableId: { type: String, unique: true },
    totalAmount: { type: Number, default: 0 },
    totalDishes: { type: Number, default: 0 },
    OrderDetails: [
      {
        name: { type: String, required: true },
        image: { type: String, default: "/images/placeholder.jpg" },
        sizes: {
          type: Map,
          of: new Schema({
            price: { type: Number, required: true },
            quantity: { type: Number, default: 0 },
          }),
          required: true,
        },
        category: { type: String, required: true },
        count: { type: Boolean, default: true },
      },
    ],
    tablestamp: { type: Number, unique: [true, "Bill alerady present.."] },
  },
  { timestamps: true }
);

// Create and export the model with proper typings
const TableModel: Model<ITable> =
  mongoose.models.Table || mongoose.model<ITable>("Table", TableSchema);

export default TableModel;
