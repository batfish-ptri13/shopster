/*
recommendations: [ { _id, created_at, category, total_score } ]  
recommendations: [ { _id, category, protocol_step, overview, details } ]
*/

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  questionnaireRecords: [],
  recommendations: [],
  hasImbalance: false
};

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    updateHasImbalance: (state, action) => {
      state.hasImbalance = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchQuestionnairesData.fulfilled, (state, action) => {
      state.questionnaireRecords = action.payload.questionnaires;
      state.recommendations = action.payload.recommendations;
    })
  }
});

const fetchQuestionnairesData = createAsyncThunk(
  'results/fetchQuestionnairesData',
  async (lastQuestionnaireDate) => {
    const response = await fetch(
      '/api/questionnaire/scores',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: lastQuestionnaireDate })
      }
    );
    const data = await response.json();
    return data;
  }
);

export const { updateHasImbalance } = resultsSlice.actions;
export { fetchQuestionnairesData };
export default resultsSlice.reducer;