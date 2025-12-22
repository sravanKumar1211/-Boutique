import express from 'express'
import productRoutes from './routes/productRoutes.js'
import errorMiddleware from './middleware/error.js'
import user from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1', productRoutes)
app.use('/api/v1', user)
app.use(errorMiddleware)


export default app

