import dotenv from 'dotenv'
import app from './app.js'
import { connectMongoDatabase } from './config/db.js'
import {v2 as cloudinary} from 'cloudinary';

dotenv.config({
  path: './backend/config/config.env',
})
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
})
connectMongoDatabase()

//Handle uncaught exception errors
process.on('uncaughtException',(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Server is shutting down due to uncaghtException errors`)
    process.exit(1)

})

const PORT = process.env.PORT || 8000

const server=app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

// promise rejection error
process.on('unhandledRejection',(err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`server is shutting down,due to unhandled promise rejection`);
  server.close(()=>{
    process.exit(1)
  })
})