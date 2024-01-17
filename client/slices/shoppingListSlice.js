import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    shoppingList: []
};

// get all products in the database
export const getAllProducts = createAsyncThunk('shoppingListSlice/getAllProducts', async (products, { rejectWithValue }) => {
    console.log('products from thunk --->', products);

    const response = await fetch('/api/list/getAllProd');

    return await response.json()
})

// // POST to submitList to update users shopping list
// export const submitList = createAsyncThunk('shoppingListSlice/submitList', async (groceryList, { rejectWithValue }) => {

//     console.log('grocery-list from thunk', groceryList)

//     const response = await fetch('/api/list/submitList', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(groceryList)
//     })

//     if (!response.ok) {
//         console.log('error in thunk');
//         // const errorData = await response.json();
//         return rejectWithValue(response);
//     }

//     // const respnoseJSON = await response.json();

//     return await response.json();

// })

const shoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState,
    reducers: {
        getProducts: (state, action) => {
            state.products = action.payload
        },
        toggleListed: (state, action) => {
            const returned = state.products.map(product => {

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
                return { ...prod, listed: false }
            })
        });
        // builder.addCase(submitList.fulfilled, (state, action) => {
        //     state.shoppingList = action.payload
        //     console.log('submitList response---->', action.payload);
        // })
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