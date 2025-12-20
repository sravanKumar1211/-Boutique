import mongoose from "mongoose";


export const connectMongoDatabase=()=>{

mongoose.connect(process.env.DB_URI)
.then((data)=>{console.log(`db connected ${data.connection.host}`)});
}
