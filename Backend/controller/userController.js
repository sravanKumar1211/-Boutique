import handleAsyncError from '../middleware/handleAsyncError.js'
import User from '../models/userModel.js'
import HandleError from '../utils/handleError.js';
import { sendToken } from '../utils/jwtToken.js';



export const registerUser=handleAsyncError(async(req,res,next)=>{
        const{name,email,password}=req.body;
        const user=await User.create({
            name,
            email,
            password,
            avatar:{
                public_id:"This is temp id",
                url:"This is temp url"
            }
        })
         //generate token from custum function
         sendToken(user,200,res)
})

//Login User
export const loginUser=handleAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new HandleError("Email or password cannot empty",400))
    }

    const user =await User.findOne({email}).select("+password");
    if(!user){
        return next(new HandleError("Invalid Email or password",401))
    }

    const isPasswordValid=await user.verifyPassword(password);
    if(!isPasswordValid){
        return next(new HandleError("Invalid Email or Password",401))
    }
    //generate token from custum function
    sendToken(user,200,res)

})

//Logout
export const logout=handleAsyncError(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true, 
        message:"Successfully Logged out"
    })
})

//ResetPassword

export const requestPasswordReset=handleAsyncError(async(req,res,next)=>{ 
     console.log("typeof next:", typeof next);
    const {email}=req.body 
    const user=await User.findOne({email});
     if(!user){ 
        return next(new HandleError("User does't exist",400)
    )} 
 try{
     let resetToken=user.generatePasswordResetToken() 
     console.log(resetToken)
     await user.save({validateBeforeSave:false}) 
     console.log('hello')
    }catch(error){ 
        console.log(error.message)
        return next(new HandleError("could not save reset token,please try again later",500)) 
    } })



