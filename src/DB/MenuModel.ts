import { IDish } from "@/utils/types";
import mongoose, { Model, Schema } from "mongoose";

export const DishSchema: Schema<IDish> = new Schema({
  name: { type: String, required: true, unique: true },
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
});

// Export the model
const Dish: Model<IDish> =
  mongoose.models.Dish || mongoose.model<IDish>("Dish", DishSchema);
export default Dish;
