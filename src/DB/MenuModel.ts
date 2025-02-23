import { IDish } from "@/utils/types";
import mongoose, { Schema } from "mongoose";

// Define the Mongoose Schema
export const DishSchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  sizes: {
    quarter: {
      price: { type: Number, required: true },
      quantity: { type: Number, default: 0 },
    },
    half: {
      price: { type: Number, required: true },
      quantity: { type: Number, default: 0 },
    },
    full: {
      price: { type: Number, required: true },
      quantity: { type: Number, default: 0 },
    },
  },
  category: { type: String, required: true },
});

// Export the model
const Dish = mongoose.models.Dish || mongoose.model<IDish>("Dish", DishSchema);
export default Dish;
