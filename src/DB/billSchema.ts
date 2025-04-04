import { BillContentType, BillModelType } from "@/utils/types";
import { Model, model, models, Schema } from "mongoose";

const BillContentSchema = new Schema<BillContentType>({
  name: { type: String, required: true, index: true }, // Indexed for dish-based queries
  quantity: { type: Number, required: true },
  cost: { type: Number, required: true },
  size: { type: String, required: true },
});

const BillSchema = new Schema<BillModelType>(
  {
    totalAmount: { type: Number, required: true },
    totalDishes: { type: Number, required: true },
    tableId: { type: String, required: true, index: true }, // Helps track table-wise revenue
    paymentMethod: { type: String, enum: ["cash", "upi"], default: "cash" },
    credited: { type: Boolean, default: false },
    billcontent: { type: [BillContentSchema], required: true },
    discount: { type: Number, required: true },
    customerName: { type: String, default: "Anonymous" },
    tablestamp: {
      type: Number,
      required: true,
      unique: [true, "Bill already printed"],
    },
    amountPayable: { type: Number, required: true },
    timestamp: { type: Number, required: true, index: true }, // Enables time-based analytics
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);
BillSchema.index({ "billcontent.name": 1, timestamp: 1 }); // Querying dishes over time

const BillModel: Model<BillModelType> =
  models.Bill || model<BillModelType>("Bill", BillSchema);
export default BillModel;
