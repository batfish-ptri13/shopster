import { configureStore } from "@reduxjs/toolkit";
import questionnaireReducer from './slices/questionnaireSlice.js';
import resultsReducer from "./slices/resultsSlice.js";

const store = configureStore({
  reducer: {
    questionnaire: questionnaireReducer,
    results: resultsReducer
  }
});

export default store;