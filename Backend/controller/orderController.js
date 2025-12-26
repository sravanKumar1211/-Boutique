import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";

//Create New Order
export const createNewOrder=handleAsyncError(async(req,res,next)=>{
    const {shippingInfo, orderItems,paymentInfo,
        itemPrice, taxPrice,phoneNo,shippingPrice,totalPrice}=req.body;
    const order=await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        phoneNo,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })
    res.status(201).json({
        success:true,
        order
    })
})