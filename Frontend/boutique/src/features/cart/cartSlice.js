import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const addItemsToCart = createAsyncThunk('cart/addItemsToCart', async ({ id, quantity }, { rejectWithValue }) => {
    try {
        // Corrected: GET requests don't take a body, just the URL
        const { data } = await axios.get(`/api/v1/product/${id}`);
        
        return {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            // Fallback for image property naming
            image: data.product.images?.[0]?.url || data.product.image?.[0]?.url || "",
            // Fallback for Stock vs stock
            stock: data.product.Stock ?? data.product.stock,
            quantity
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
        loading: false,
        error: null,
        message: null
    },
    reducers: {
        removeItemsFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.product !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeErrors: (state) => { state.error = null },
        removeMessage: (state) => { state.message = null }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItemsToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addItemsToCart.fulfilled, (state, action) => {
                const item = action.payload;
                const isItemExist = state.cartItems.find((i) => i.product === item.product);

                if (isItemExist) {
                    state.cartItems = state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    );
                } else {
                    state.cartItems.push(item);
                }
                state.loading = false;
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            })
            .addCase(addItemsToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { removeErrors, removeMessage, removeItemsFromCart } = cartSlice.actions;
export default cartSlice.reducer;


