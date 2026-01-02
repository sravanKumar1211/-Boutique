import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Internal Imports
import { loadUser } from './features/user/userSlice.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products.jsx';
import Register from './User/Register.jsx';
import Login from './User/Login.jsx';
import Profile from './User/Profile.jsx';
import UpdateProfile from './User/UpdateProfile.jsx';
import UpdatePassword from './User/UpdatePassword.jsx';
import ForgotPassword from './User/ForgotPassword.jsx';
import ResetPassword from './User/ResetPassword.jsx';
import Cart from './Cart/Cart.jsx';
import Shipping from './Cart/Shipping.jsx';
import OrderConfirm from './Cart/OrderConfirm.jsx';
import Payment from './Cart/Payment.jsx';
import PaymentSuccess from './Cart/PaymentSuccess.jsx';
import MyOrders from './Orders/MyOrders.jsx';
import OrderDetails from './Orders/OrderDetails.jsx';
import Dashboard from './Admin/Dashboard.jsx';
import ProductsList from './Admin/ProductsList.jsx';
import CreateProduct from './Admin/CreateProduct.jsx';
import UpdateProduct from './Admin/UpdateProduct.jsx';
import UsersList from './Admin/UsersList.jsx';
import UpdateRole from './Admin/UpdateRole.jsx';

function App() {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector(state => state.user);

    
useEffect(() => {
    // This must run on every refresh to check if a valid cookie exists
    dispatch(loadUser());
}, [dispatch]);

    return (
        <Router>
            <Routes>
                {/* --- Public Routes --- */}
                <Route path='/' element={<Home />} />
                <Route path='/product/:id' element={<ProductDetails />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/:keyword' element={<Products />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/password/forgot' element={<ForgotPassword />} />
                <Route path='/password/reset/:token' element={<ResetPassword />} />
                <Route path='/cart' element={<Cart />} />

                {/* --- Logged In User Routes --- */}
                <Route path='/profile' element={<ProtectedRoute element={<Profile />} />} />
                <Route path='/profile/update' element={<ProtectedRoute element={<UpdateProfile />} />} />
                <Route path='/password/update' element={<ProtectedRoute element={<UpdatePassword />} />} />
                <Route path='/shipping' element={<ProtectedRoute element={<Shipping />} />} />
                <Route path='/order/confirm' element={<ProtectedRoute element={<OrderConfirm />} />} />
                <Route path='/process/payment' element={<ProtectedRoute element={<Payment />} />} />
                <Route path='/paymentSuccess' element={<ProtectedRoute element={<PaymentSuccess />} />} />
                <Route path='/orders/user' element={<ProtectedRoute element={<MyOrders />} />} />
                <Route path='/order/:id' element={<ProtectedRoute element={<OrderDetails />} />} />

                {/* --- Admin Only Routes --- */}
                <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true} element={<Dashboard />} />} />
                <Route path='/admin/products' element={<ProtectedRoute isAdmin={true} element={<ProductsList />} />} />
                <Route path='/admin/product/create' element={<ProtectedRoute isAdmin={true} element={<CreateProduct />} />} />
                <Route path='/admin/product/:updateId' element={<ProtectedRoute isAdmin={true} element={<UpdateProduct />} />} />
                <Route path='/admin/users' element={<ProtectedRoute isAdmin={true} element={<UsersList />} />} />
                <Route path='/admin/user/:userId' element={<ProtectedRoute isAdmin={true} element={<UpdateRole />} />} />
            </Routes>
        </Router>
    );
}

export default App;