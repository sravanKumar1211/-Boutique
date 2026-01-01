
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 1. Create Order Thunk
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (order, { rejectWithValue }) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post('/api/v1/new/order', order, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Order creation failed.');
    }
  }
);

// 2. Get user order
export const getAllMyOrders = createAsyncThunk(
  'order/getAllMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/v1/order/user');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to load orders.');
    }
  }
);

// 3. Get user order
export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/order/${orderId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to get order details.');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    success: false,
    loading: false,
    error: null,
    orders: [],
    order: {}
  },
  reducers: {
    // RENAME: Match this with your component's import
    clearErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Order Logic
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.success = action.payload.success;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // get user orders
      .addCase(getAllMyOrders.pending, (state) => {
        state.loading = true;
        state.error=null;
      })
      .addCase(getAllMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders= action.payload.orders;
        state.success=action.payload.success
      })
      .addCase(getAllMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to get Orders'
      })

       // get order details
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error=null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order= action.payload.order;
        state.success=action.payload.success
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to get Order details'
      });
  }
});

// Export correctly
export const { clearErrors, removeSuccess } = orderSlice.actions;
export default orderSlice.reducer;