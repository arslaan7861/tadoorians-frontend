import { EmptyTableOnServer, getTablesData } from "@/Server-actions/getData";
import { UpdateServerTable } from "@/Server-actions/updateOrders";
import { OrdersState, tableType } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculateAmountAndDishes } from "@/utils/tableFunctions";
import { updateBill } from "./bill";
import { toast } from "sonner";
import {
  addServerTable,
  removedServerTable,
} from "@/Server-actions/tableActions";

export const initialState: OrdersState = {
  tables: {},
};
export const addTable = createAsyncThunk(
  "tableOrders/addTable",
  async (tableId: string, { dispatch }) => {
    const toastId = toast.loading("Adding table " + tableId);
    try {
      const respString = (await addServerTable(tableId)) as string;
      const resp = JSON.parse(respString);
      dispatch(updateTableState(resp));
      console.log(resp);
      toast.success("Cleaned table " + tableId, { id: toastId });
    } catch (error) {
      if (error)
        toast.error("Failed to clean table " + tableId, {
          id: toastId,
          description: "Please try again...",
        });
    }
  }
);
export const removeTable = createAsyncThunk(
  "tableOrders/removeTable",
  async (tableId: string, { dispatch }) => {
    const toastId = toast.loading("Cleaning table " + tableId);
    try {
      const respString = await removedServerTable(tableId);
      const resp = JSON.parse(respString);
      if (!resp.ok)
        return toast.error(resp.message, {
          id: toastId,
          description: "Please try again...",
        });
      dispatch(removeTableState(tableId));
      toast.success("Cleaned table " + tableId, { id: toastId });
    } catch (error) {
      if (error)
        toast.error("Failed to remove table " + tableId, {
          id: toastId,
          description: "Please try again...",
        });
    }
  }
);
export const EmptyTable = createAsyncThunk(
  "tableOrders/emptytable",
  async (tableId: string, { dispatch }) => {
    const toastId = toast.loading("Cleaning table " + tableId);
    try {
      const resp = (await EmptyTableOnServer(tableId)) as string;
      const serverResponse = JSON.parse(resp) as {
        table: tableType;
        ok: boolean;
      };
      if (!serverResponse.ok)
        return toast.error("Failed to clean table " + tableId, {
          id: toastId,
          description: "Please try again...",
        });
      dispatch(updateTableState(serverResponse.table));
      toast.success("Cleaned table " + tableId, { id: toastId });
    } catch (error) {
      if (error)
        toast.error("Failed to clean table " + tableId, {
          id: toastId,
          description: "Please try again...",
        });
    }
  }
);
export const getData = createAsyncThunk(
  "tableOrders/getData",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const resp = (await getTablesData()) as string;
      const tables = JSON.parse(resp) as tableType[];
      dispatch(initTables(tables));
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
      const ts = Date.now();
      const { totalAmount, totalDishes, bill } =
        calculateAmountAndDishes(table);

      const status = await UpdateServerTable({
        ...table,
        totalAmount,
        totalDishes,
        lastUpdated: ts,
      });
      if (status.ok) {
        console.log("updated table on server");
      }
      dispatch(
        updateTableState({
          ...table,
          totalAmount,
          totalDishes,
          lastUpdated: ts,
        })
      );
      dispatch(updateBill(bill));
      console.log("updated table state");
      toast.success("Saved orders succecfully!");
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
    removeTableState: (state, { payload }: PayloadAction<string>) => {
      if (state.tables[payload]) delete state.tables[payload];
    },
  },
  // extraReducers: (builder) => {},
});
export const { updateTableState, initTables, removeTableState } =
  tableOrdersSlice.actions;
export default tableOrdersSlice.reducer;
