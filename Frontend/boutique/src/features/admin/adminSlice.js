
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminProducts = createAsyncThunk(
    'admin/fetchAdminProducts',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/api/v1/admin/products');
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error While Fetching Products');
        }
    }
);

export const createProduct = createAsyncThunk(
    'admin/createProduct',
    async (productData, { rejectWithValue }) => {
        try {
            
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post('/api/v1/admin/product/create', productData, config);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error While creating Product');
        }
    }
);

//Update product

// export const updateProduct = createAsyncThunk(
//     'admin/updateProduct',
//     async ({id,formData}, { rejectWithValue }) => {
//         try {
//             const config = { headers: { 'Content-Type': 'multipart/fom-data' } };
//             const { data } = await axios.put(`/api/v1/admin/product/${id}`, formData, config);
//             return data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Error While Updating Product');
//         }
//     }
// );


// Update product
export const updateProduct = createAsyncThunk(
    'admin/updateProduct',
    async ({ updateId, productData }, { rejectWithValue }) => { // renamed formData to productData for clarity
        try {
            // Using application/json because we are sending Base64 arrays
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.put(`/api/v1/admin/product/${updateId}`, productData, config);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error While Updating Product');
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        products: [],
        success: false,
        loading: false,
        error: null,
        product: {} 
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Admin Products
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Product
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.product = action.payload.product;
                // Add to the list so the UI updates without a refresh
                state.products.push(action.payload.product);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Update product

             .addCase(updateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.product = action.payload.product;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { removeErrors, removeSuccess } = adminSlice.actions;
export default adminSlice.reducer;