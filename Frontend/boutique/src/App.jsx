import React, { useEffect } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products.jsx'
import Register from './User/Register.jsx'
import Login from './User/Login.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './features/user/userSlice.js'
import UserDashboard from './User/UserDashboard.jsx'
import Profile from './User/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import UpdateProfile from './User/UpdateProfile.jsx'
import UpdatePassword from './User/UpdatePassword.jsx'
import ForgotPassword from './User/ForgotPassword.jsx'
import ResetPassword from './User/ResetPassword.jsx'
import Cart from './Cart/Cart.jsx'
import Shipping from './Cart/Shipping.jsx'
import OrderConfirm from './Cart/OrderConfirm.jsx'
import Payment from './Cart/Payment.jsx'
import PaymentSuccess from './Cart/PaymentSuccess.jsx'
import MyOrders from './Orders/MyOrders.jsx'
import OrderDetails from './Orders/OrderDetails.jsx'

function App() {
  const{isAuthenticated,user}=useSelector(state=>state.user)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(isAuthenticated){
      dispatch(loadUser())
    }
  },[dispatch])
 // console.log(user)
  //console.log(isAuthenticated)
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/product/:id' element={<ProductDetails></ProductDetails>}></Route>
        <Route path='/products' element={<Products></Products>}></Route>
        <Route path='/products/:keyword' element={<Products></Products>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/profile/update' element={<UpdateProfile></UpdateProfile>}></Route>
        <Route path='/password/update' element={<UpdatePassword></UpdatePassword>}></Route>
        <Route path='/password/forgot' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='password/reset/:token' element={<ResetPassword></ResetPassword>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        {isAuthenticated && <Route path='/shipping' element={<Shipping></Shipping>}></Route>}
        {isAuthenticated && <Route path='/order/confirm' element={<OrderConfirm></OrderConfirm>}></Route>}
        {isAuthenticated && <Route path='/process/payment' element={<Payment></Payment>}></Route>}
        {isAuthenticated && <Route path='/paymentSuccess' element={<PaymentSuccess></PaymentSuccess>}></Route>}
        {isAuthenticated && <Route path='/orders/user' element={<MyOrders></MyOrders>}></Route>}
        {isAuthenticated && <Route path='/order/:id' element={<OrderDetails></OrderDetails>}></Route>}
      </Routes>
       
      {/* {isAuthenticated && <UserDashboard user={user}></UserDashboard>} */}
    </Router>
  )
}

export default App
