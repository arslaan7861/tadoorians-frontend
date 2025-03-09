import { BillType } from "./types";

export const emptyBill: BillType = {
  billcontent: [],
  totalAmount: 0,
  totalDishes: 0,
  tableId: "0",
  credited: false,
  paymentMethod: "cash",
  discount: 0,
  customerName: "",
  amountPayable: 0,
  timestamp: 0,
  tablestamp: 0,
};
