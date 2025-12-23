import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

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
userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;

    try {
        this.password = await bcryptjs.hash(this.password, 12);
    } catch (err) {
        // You just throw it! 
        // Mongoose catches this throw and sends it to your Controller's .catch() block
        throw new Error("Encryption failed"); 
    }
});

//It will generate JWT token
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

//compare Password
userSchema.methods.verifyPassword=async function(userEnteredPassword){
        return await bcryptjs.compare(userEnteredPassword,this.password)
}

//generating token
userSchema.methods.generatePasswordResetToken=function(){
    const resetToken=crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+5*60*1000 //5min
    return resetToken;
}


export default mongoose.model("User",userSchema)
