import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartData: [],
  userOrders: [],
  allOrders: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartData(state, action) {
      state.cartData = action.payload;
    },
    userOrderData(state, action) {
      state.userOrders = action.payload;
    },
    allOrderData(state, action) {
      state.allOrders = action.payload;
    },
  },
});
export const { cartData, userOrderData, allOrderData } = cartSlice.actions;
export default cartSlice.reducer;
