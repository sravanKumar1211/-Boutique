import handleAsyncError from '../middleware/handleAsyncError.js'
import User from '../models/userModel.js'
import HandleError from '../utils/handleError.js';
import { sendToken } from '../utils/jwtToken.js';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto'



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

//Forget Password Link and sending email

export const requestPasswordReset = handleAsyncError(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return next(new HandleError("User doesn't exist", 400));
    }

    // 1. Declare the variable here (Function Scope)
    let resetToken;

    try {
        // 2. Assign the value inside the block
        resetToken = user.generatePasswordResetToken();
        await user.save({ validateBeforeSave: false });
    } catch (error) {
        return next(new HandleError("Could not save reset token, please try again later", 500));
    }

    // 3. Now it is accessible here!
    const resetPasswordURL = `http://localhost/api/v1/reset/${resetToken}`;
    
    const message = `Use the following link to reset your password: ${resetPasswordURL}.\n\n This link will expire in 5 min.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset Request',
            message
        });

        res.status(200).json({
            success: true,
            message: `Email is sent to ${user.email} successfully`
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new HandleError(error.message, 500));
    }
});

//Reset Password

export const resetPassword=handleAsyncError(async(req,res,next)=>{
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        return next(new HandleError("Reset Password token is invalid or has been expired",400))
    }

    const {password,confirmPassword}=req.body;
    if(password!==confirmPassword){
        return next(new HandleError("Password doesn't match",400))
    }
    user.password=password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    //helperfunction to send response
    sendToken(user,200,res)
}) 

//Get User details
export const getUserDetails=handleAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id)
    res.status(200).json({
        success:true,
        user
    })
})

//Update Password, user remember oldPassword but want to change it

export const updatePassword=handleAsyncError(async(req,res,next)=>{
    const {oldPassword,newPassword,confirmPassword}=req.body;
    const user=await User.findById(req.user.id).select('+password');
    const checkPasswordMatch=await user.verifyPassword(oldPassword);
    if(!checkPasswordMatch){
        return next(new HandleError('old password is incorrect',400))
    }
    if(newPassword!==confirmPassword){
        return next(new HandleError("Password doesn't match",400))
    }
    user.password=newPassword;
    await user.save();
    //helperfunction to send response
    sendToken(user,200,res);
})

//Update user Profile

export const updateProfile=handleAsyncError(async(req,res,next)=>{
    const {name,email}=req.body;
    const updateUserDetails={
        name,
        email
    }
    const user=await User.findByIdAndUpdate(req.user.id,
        updateUserDetails,{
            new:true,
            runValidators:true
        })
        res.status(200).json({
            success:true, 
            message:"Profile Updated Successfully",
            user
        })
})