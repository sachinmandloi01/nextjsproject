import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productsData: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productsData(state, action) {
      state.productsData = action.payload;
    },
  },
});
export const { productsData } = productSlice.actions;
export default productSlice.reducer;
