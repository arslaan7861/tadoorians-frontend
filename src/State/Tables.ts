import { getTablesData } from "@/Server-actions/getData";
import { UpdateServerTable } from "@/Server-actions/updateOrders";
import { menuData } from "@/utils/menu";
import { OrdersState, tableType } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addToast } from "./toast";
import { toast } from "sonner";

export const initialState: OrdersState = {
  tables: {
    "1": {
      tableId: "1",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
      lastUpdated: 0,
    },
    "2": {
      tableId: "2",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
      lastUpdated: 0,
    },
    "3": {
      tableId: "3",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
      lastUpdated: 0,
    },
    "4": {
      tableId: "4",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
      lastUpdated: 0,
    },
    "5": {
      tableId: "5",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
      lastUpdated: 0,
    },
    "6": {
      tableId: "6",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
      lastUpdated: 0,
    },
    "7": {
      tableId: "7",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
      lastUpdated: 0,
    },
    "8": {
      tableId: "8",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
      lastUpdated: 0,
    },
    "9": {
      tableId: "9",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
      lastUpdated: 0,
    },
    "10": {
      tableId: "10",
      totalAmount: 0,
      totalDishes: 0,
      OrderDetails: menuData,
      lastUpdated: 0,
    },
  },
};
export const getData = createAsyncThunk(
  "tableOrders/getData",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const resp = (await getTablesData()) as string;
      dispatch(initTables(JSON.parse(resp) as tableType[]));
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to fetch data");
    }
  }
);
export const updateTable = createAsyncThunk(
  "tableOrders/updateTable",
  async (table: tableType, { rejectWithValue, dispatch }) => {
    try {
      const status = await UpdateServerTable(table);
      if (status.ok) {
        console.log("updated table on server");
      }
      dispatch(updateTableState(table));
      console.log("updated table state");
      dispatch(
        addToast({
          message: "Saved orders succecfully!",
          status: "success",
          timestamp: 0,
        })
      );
      toast("test toast");
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to fetch data");
    }
  }
);
const tableOrdersSlice = createSlice({
  name: "tableOrders",
  initialState,
  reducers: {
    updateTableState: (state, { payload }: PayloadAction<tableType>) => {
      state.tables[payload.tableId] = payload;
    },
    initTables: (state, { payload }: PayloadAction<tableType[]>) => {
      payload.forEach((tab) => {
        state.tables[tab.tableId] = tab;
      });
      console.log("updated tables from server");
    },
  },
  // extraReducers: (builder) => {},
});
export const { updateTableState, initTables } = tableOrdersSlice.actions;
export default tableOrdersSlice.reducer;
