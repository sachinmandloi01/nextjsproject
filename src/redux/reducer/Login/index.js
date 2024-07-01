import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const initialState = {
  userData: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    userProfileData(state, action) {
      state.userData = action.payload;
    },
    resetLogin(state, action) {
      state.userData = {};
      storage.removeItem("persist:test");
    },
  },
});
export const { userProfileData, resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
