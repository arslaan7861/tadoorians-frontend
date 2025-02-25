import { toastType } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: toastType[] = [];
const MAX_TOASTS = 3;
const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, { payload }: PayloadAction<toastType>) => {
      if (state.length >= MAX_TOASTS) {
        state.shift(); // Remove the oldest toast (first element)
      }
      state.push({ ...payload, timestamp: Date.now() }); // Add the new toast
    },
    removeToast: (state, { payload }: PayloadAction<number>) => {
      //   console.log("removed toast");
      //   console.log(state[0]);
      //   console.log({ payload });

      return state.filter((t) => {
        console.log(t.timestamp !== payload);
        return t.timestamp !== payload;
      });
    },
  },
});
export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
