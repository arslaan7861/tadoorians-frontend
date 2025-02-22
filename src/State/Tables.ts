import { menuData } from "@/utils/menu";
import { OrdersState, tableType } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: OrdersState = {
  tables: {
    "1": {
      tableId: "1",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
    },
    "2": {
      tableId: "2",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
    },
    "3": {
      tableId: "3",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
    },
    "4": {
      tableId: "4",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
    },
    "5": {
      tableId: "5",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
    },
    "6": {
      tableId: "6",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
    },
    "7": {
      tableId: "7",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
    },
    "8": {
      tableId: "8",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
    },
    "9": {
      tableId: "9",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
    },
    "10": {
      tableId: "10",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
    },
  },
};

const tableOrdersSlice = createSlice({
  name: "tableOrders",
  initialState,
  reducers: {
    updateTable: (state, { payload }: PayloadAction<tableType>) => {
      console.log({ payload });
      state.tables[payload.tableId] = payload;
    },
  },
});
export const { updateTable } = tableOrdersSlice.actions;
export default tableOrdersSlice.reducer;
