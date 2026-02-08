import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AddingSequence } from "../utils/Calcs/addingSequence";

interface CalcState {
  wardSequence: AddingSequence[];
  avgSequence: AddingSequence[];
}

const initialState: CalcState = {
  wardSequence: [],
  avgSequence: [],
};

const calcSlice = createSlice({
  name: "calculations",
  initialState,
  reducers: {
    addWardSequence(state, action: PayloadAction<AddingSequence>) {
      state.wardSequence.push(action.payload);
    },
    addAvgSequence(state, action: PayloadAction<AddingSequence>) {
      state.avgSequence.push(action.payload);
    },
    clearSequences(state) {
      state.wardSequence = [];
      state.avgSequence = [];
    },
  },
});

export const {
  addWardSequence,
  addAvgSequence,
  clearSequences,
} = calcSlice.actions;

export default calcSlice.reducer;