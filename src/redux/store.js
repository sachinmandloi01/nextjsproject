// import { configureStore } from "@reduxjs/toolkit";
// import { createWrapper } from "next-redux-wrapper";
// import counterReducer from "./reducer/counterSlice";
// import loginSlice from "./reducer/Login/index";
// import productSlice from "./reducer/Product/index";
// import cartSlice from "./reducer/Cart/index"
// const makeStore = () =>
//   configureStore({
//     reducer: {
//       counter: counterReducer,
//       login: loginSlice,
//       product: productSlice,
//       cart: cartSlice
//     },
//   });

// export const wrapper = createWrapper(makeStore);
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { createWrapper } from "next-redux-wrapper";
import { configureStore, Reducer } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import counterReducer from "./reducer/counterSlice";
import loginSlice from "./reducer/Login/index";
import productSlice from "./reducer/Product/index";
import cartSlice from "./reducer/Cart/index";
const rootReducer = combineReducers({
  counter: counterReducer,
  login: loginSlice,
  product: productSlice,
  cart: cartSlice,
});
const persistConfig = {
  key: "test",
  storage: storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
  devTools: true,
});
export default store;
const makeStore = () => store;
export const persistor = persistStore(store);
export const wrapper = createWrapper(makeStore);
