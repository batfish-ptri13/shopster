import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  // add state here
};

const mazeSlice = createSlice({
  name: 'maze',
  initialState,
  reducers: {
    // add common reducers here
  },
  extraReducers: builder => {
    // add reducers for thunk functions here. E.g., "builder.addCase(xxx.fulfilled, (state, action) => {}
  }
});

// add Thunk function definitions here
const xxx = createAsyncThunk(
  'maze/xxx',
  async () => {
    // async request here
  }
);

// export common reducers like this:
// export const { updateAnswers } = mazeSlice.actions;

// export thunk functions like this:
// export { xxx };

// export the whole mazeSlice reducer for redux store
export default mazeSlice.reducer;