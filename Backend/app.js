import express from 'express'
import productRoutes from './routes/productRoutes.js'
import errorMiddleware from './middleware/error.js'
import user from './routes/userRoutes.js'
const app = express()

app.use(express.json())

app.use('/api/v1', productRoutes)
app.use('/api/v1', user)
app.use(errorMiddleware)


export default app

