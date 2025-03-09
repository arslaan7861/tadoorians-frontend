import { emptyBill } from "@/utils/menu";
import { BillType } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = emptyBill;
const billslice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    updateBill: (state, { payload }: PayloadAction<BillType>) => {
      console.log({ tablestamp: payload.tablestamp });
      return payload;
    },
  },
});
export const { updateBill } = billslice.actions;
export default billslice.reducer;
