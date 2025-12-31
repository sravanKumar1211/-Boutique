import express from 'express'
import productRoutes from './routes/productRoutes.js'
import errorMiddleware from './middleware/error.js'
import user from './routes/userRoutes.js'
import order from './routes/orderRoutes.js'
import payment from './routes/paymentRoutes.js'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())

app.use('/api/v1', productRoutes)
app.use('/api/v1', user)
app.use('/api/v1', order)
app.use('/api/v1',payment)
app.use(errorMiddleware)
dotenv.config({path:'../Backend/config/config.env'})


export default app

