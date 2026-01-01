import express from 'express';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import path from 'path';

// 1. Load ENV first so it's available for all imports below
dotenv.config({ path: 'backend/config/config.env' });

// Import routes after dotenv
import productRoutes from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import payment from './routes/paymentRoutes.js';
import errorMiddleware from './middleware/error.js';

const app = express();

// 2. Fix the 413 Error by increasing limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());

// 3. Configure fileUpload if you plan to use req.files later
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    useTempFiles: true
}));

// Routes
app.use('/api/v1', productRoutes);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

// Error Middleware
app.use(errorMiddleware);

export default app;

