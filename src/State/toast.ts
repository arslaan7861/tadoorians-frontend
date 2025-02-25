import { toastType } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: toastType[] = [];
const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, { payload }: PayloadAction<toastType>) => {
      state.push({ ...payload, timestamp: Date.now() });
    },
    removeToast: (state, { payload }: PayloadAction<number>) => {
      state = state.filter((t) => t.timestamp != payload);
    },
  },
});
export default toastSlice.reducer;
