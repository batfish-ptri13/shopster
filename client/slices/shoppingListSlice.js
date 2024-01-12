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
        },
        toggleListed: (action, payload) => {
            state.products = state.products.map(product => {
                if (product.prod_id === action.payload) {
                    product.listed = !product.listed
                } else {
                    product = product
                }

            })

        }


    }

});

// add Thunk function definitions here
const xxx = createAsyncThunk(
    'maze/xxx',
    async () => {
        // async request here
    }
);



export const { getProducts, toggleListed } = shoppingListSlice.actions;

export default shoppingListSlice.reducer;