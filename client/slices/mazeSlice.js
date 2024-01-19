import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  layout: []
};

const mazeSlice = createSlice({
  name: 'maze',
  initialState,
  reducers: {
    // add common reducers here
  },
  extraReducers: builder => {
    // add reducers for thunk functions here. E.g., "builder.addCase(xxx.fulfilled, (state, action) => {}
    builder.addCase(submitList.fulfilled, (state, action) => {
      state.layout = action.payload
      console.log('updated layout---->', action.payload);
    })
  }
});

// add Thunk function definitions here
// POST to submitList to update users shopping list
export const submitList = createAsyncThunk('shoppingListSlice/submitList', async (groceryList, { rejectWithValue }) => {

  console.log('grocery-list from thunk', groceryList)

  const response = await fetch('/api/list/submitList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(groceryList)
  })

  if (!response.ok) {
    console.log('error in thunk');
    // const errorData = await response.json();
    return rejectWithValue(response);
  }

  // const respnoseJSON = await response.json();

  return await response.json();

})

// export common reducers like this:
// export const { updateAnswers } = mazeSlice.actions;

// export thunk functions like this:
// export { xxx };

// export the whole mazeSlice reducer for redux store
export default mazeSlice.reducer;