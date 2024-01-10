import { configureStore } from "@reduxjs/toolkit";
import mazeReducer from "./slices/mazeSlice.js";

const store = configureStore({
  reducer: {
    maze: mazeReducer
  }
});

export default store;