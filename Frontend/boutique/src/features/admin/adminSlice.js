
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

export const updateProduct = createAsyncThunk(
    'admin/updateProduct',
    async ({ updateId, productData }, { rejectWithValue }) => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.put(`/api/v1/admin/product/${updateId}`, productData, config);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error While Updating Product');
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'admin/deleteProduct',
    async (productId, { rejectWithValue }) => { 
        try {
            const { data } = await axios.delete(`/api/v1/admin/product/${productId}`);
            return { productId, data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error While deleting Product');
        }
    }
);

export const fetchUsers = createAsyncThunk(
    'admin/fetchUsers',
    async (_, { rejectWithValue }) => { 
        try {
            const { data } = await axios.get(`/api/v1/admin/users`);
            return data; // Fixed: Returning data directly
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error While feching users');
        }
    }
);

export const getSingleUser = createAsyncThunk(
    'admin/getSingleUser',
    async (id, { rejectWithValue }) => { 
        try {
            const { data } = await axios.get(`/api/v1/admin/user/${id}`);
            return data; // Fixed: Returning data directly
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error While feching user');
        }
    }
);

export const UpdateUserRole = createAsyncThunk(
    'admin/UpdateUserRole',
    async ({userId,role}, { rejectWithValue }) => { 
        try {
            const { data } = await axios.put(`/api/v1/admin/user/${userId}`,role);
            return data; // Fixed: Returning data directly
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error updatig user role');
        }
    }
);

export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (userId, { rejectWithValue }) => { 
        try {
            const { data } = await axios.delete(`/api/v1/admin/user/${userId}`);
            return { userId, data }; // Fixed: Returning ID to filter state
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error while deleting user');
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
        product: {},
        deleteLoading: false,
        users:[],
        user:{},
        message:null
    },
    reducers: {
        removeErrors: (state) => { state.error = null; },
        removeSuccess: (state) => { state.success = false; },
        clearMessage: (state) => { state.message = null; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => { state.loading = true; })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.products.push(action.payload.product);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.success = action.payload.data.success;
                state.products = state.products.filter(product => product._id !== action.payload.productId);
            })
            // --- User Reducers ---
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users; // Now matches fixed thunk
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSingleUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user; // Fixed variable target
            })
            .addCase(UpdateUserRole.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.data.message;
                state.users = state.users.filter(user => user._id !== action.payload.userId); // UI update
            });
    }
});

export const { removeErrors, removeSuccess, clearMessage } = adminSlice.actions;
export default adminSlice.reducer;