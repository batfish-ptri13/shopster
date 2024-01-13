import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
};

// create a function thunk
export const getAllProducts = createAsyncThunk('shoppingListSlice/getAllProducts', async (products, {rejectWithValue})=> {
    console.log('products from thunk --->', products);

    const response = await fetch('/api/list/getAllProd');

    return await response.json()


})

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


    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {

            console.log('response from server--> ', action.payload);
            
            state.products = action.payload.map((prod) => {
                return {...prod, listed: false}
            })
        })
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