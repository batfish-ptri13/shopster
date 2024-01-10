import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  answers: {},
  lastQuestionnaireDate: '',
  categoryMap: {
    'A': 'High Cortisol',
    'B': 'Low Cortisol',
    'C': 'Low Progesterone and Progesterone Resistence',
    'D': 'Excess Estrogen',
    'E': 'Low Estrogen',
    'F': 'Excess Androgens',
    'G': 'Low Thyroid',
  }
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    updateAnswers: (state, action) => {
      state.answers[action.payload.ID] = action.payload.value;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchQuestionsData.fulfilled, (state, action) => {
      const questionsData = action.payload;
      state.questions = questionsData;
      for (let question of questionsData) state.answers[question._id] = '';
    });

    // updates lastQuestionnaireDate with the date returned by POST request
    builder.addCase(saveAnswersData.fulfilled, (state, action) => {
      state.lastQuestionnaireDate = action.payload;
    });
  }
});

const fetchQuestionsData = createAsyncThunk(
  'questionnaire/fetchQuestionsData',
  async () => {
    const response = await fetch('/api/questionnaire/A');
    const data = await response.json();
    return data;
  }
);

const saveAnswersData = createAsyncThunk(
  'questionnaire/saveAnswersData',
  async (postData) => {
    const response = await fetch(
      '/api/questionnaire/answers',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      }
    );
    const data = await response.json();
    return data;
  }
);

export const { updateAnswers } = questionnaireSlice.actions;
export { fetchQuestionsData, saveAnswersData };
export default questionnaireSlice.reducer;