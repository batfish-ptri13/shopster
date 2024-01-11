import { configureStore } from "@reduxjs/toolkit";
import mazeReducer from "./slices/mazeSlice.js";
import shoppingListReducer from "./slices/shoppingListSlice.js";

const store = configureStore({
  reducer: {
    maze: mazeReducer,
    shoppingList: shoppingListReducer
  }
});

export default store;