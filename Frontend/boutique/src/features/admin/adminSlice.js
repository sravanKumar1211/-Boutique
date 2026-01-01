
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
            // Note: When sending Base64 strings in an object, 
            // 'application/json' is actually often better than 'multipart/form-data'
            // but we will keep your preference.
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post('/api/v1/admin/product/create', productData, config);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error While creating Product');
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
        product: {} // To store the newly created product
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
            });
    }
});

export const { removeErrors, removeSuccess } = adminSlice.actions;
export default adminSlice.reducer;