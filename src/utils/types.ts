import { Document } from "mongoose";

export interface MenuItem {
  name: string;
  image: string;
  category: string;
  sizes: Record<
    string,
    {
      price: number;
      quantity: number;
    }
  >;
}
export interface BillContentType {
  name: string;
  quantity: number;
  cost: number;
  size: string;
}
export interface BillType {
  totalAmount: number;
  totalDishes: number;
  tableId: string;
  paymentMethod: "cash" | "upi";
  credited: boolean;
  billcontent: BillContentType[];
  discount: number;
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

export interface toastType {
  message: string;
  status: "success" | "error";
  timestamp: number;
}
