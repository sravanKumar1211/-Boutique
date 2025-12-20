import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


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

//Password Hash
userSchema.pre("save",async function(next){
     //if user want to change other data except password i prevents multy hashing
    if(!this.isModified("password")){
        return next();
    }
    this.password=await bcryptjs.hash(this.password,12)
})

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    })
}


export default mongoose.model("User",userSchema)
