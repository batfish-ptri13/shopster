import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
};

const shoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState,
    reducers: {
        getProducts: (action, payload) => {
            state.products = action.payload
        }


    }
    // reducers: {
    //     const getProducts = function () {

    //     }
    // },
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
export default shoppingListSlice.reducer;