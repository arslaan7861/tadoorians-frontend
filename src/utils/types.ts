import { Document } from "mongoose";

export interface MenuItem {
  name: string;
  image: string;
  category: string;
  sizes: {
    quarter: {
      price: number;
      quantity: number;
    };
    half: {
      price: number;
      quantity: number;
    };
    full: {
      price: number;
      quantity: number;
    };
  };
}

export interface tableType {
  tableId: string;
  totalAmount: number;
  totalDishes: number;
  OrderDetails: MenuItem[];
  _id?: string;
  lastUpdated: number;
}
export interface OrdersState {
  tables: Record<string, tableType>;
}

// Define the interface for DishSize
interface IDishSize {
  price: number;
  quantity: number;
}

// Define the interface for Dish
export interface IDish extends Document {
  name: string;
  image: string;
  sizes: {
    quarter: IDishSize;
    half: IDishSize;
    full: IDishSize;
  };
  category: string;
}
