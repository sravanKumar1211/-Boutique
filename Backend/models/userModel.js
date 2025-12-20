import mongoose from "mongoose";
import validator from "validator";


const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[50,"Invalid name.Please enter a name with fewer then 50 Characters"],
        minLength:[3,"Name should be atleast 3 Characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your email"],
        unique:true,
        validator:[validator.isEmail,"Please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[6,"Name should be atleast 6 Characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
},{timestamps:true})

export default mongoose.model("User",userSchema)
