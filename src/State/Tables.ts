import { getMenu, getTablesData } from "@/Server-actions/getData";
import { menuData } from "@/utils/menu";
import { OrdersState, tableType } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: OrdersState = {
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
export const getData = createAsyncThunk(
  "tableOrders/getData",
  async (_, { rejectWithValue }) => {
    try {
      const resp = (await getTablesData()) as string;
      return JSON.parse(resp);
    } catch (error) {
      return rejectWithValue("Failed to fetch data");
    }
  }
);
const tableOrdersSlice = createSlice({
  name: "tableOrders",
  initialState,
  reducers: {
    updateTable: (state, { payload }: PayloadAction<tableType>) => {
      state.tables[payload.tableId] = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getData.fulfilled,
      (state, { payload }: PayloadAction<tableType[]>) => {
        console.log({ payload });
        payload.forEach((tab) => {
          state.tables[tab.tableId] = { ...tab };
        });
      }
    );
  },
});
export const { updateTable } = tableOrdersSlice.actions;
export default tableOrdersSlice.reducer;
