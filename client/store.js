import { configureStore } from "@reduxjs/toolkit";
import mazeReducer from "./slices/mazeSlice.js";
import productReducer from "./slices/productSlice.js";

const store = configureStore({
  reducer: {
    maze: mazeReducer,
    product: productReducer
  }
});

export default store;