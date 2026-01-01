import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch All Products (Admin)
export const fetchAdminProducts = createAsyncThunk(
    'admin/fetchAdminProducts',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/api/v1/admin/products');
            return data; // Expecting { success: true, products: [...] }
        } catch (error) {
            // Logic to capture the specific error message from backend
            return rejectWithValue(error.response?.data?.message || 'Error While Fetching Products');
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        products: [],
        success: false,
        loading: false,
        error: null
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = false; // Changed from null to false for consistency
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.products = action.payload.products;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                // action.payload will now contain the string from rejectWithValue
                state.error = action.payload; 
            });
    }
});

export const { removeErrors, removeSuccess } = adminSlice.actions;
export default adminSlice.reducer;