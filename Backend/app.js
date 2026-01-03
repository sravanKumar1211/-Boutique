import dotenv from 'dotenv';

// 1️⃣ Load environment variables FIRST (before anything else)
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: 'backend/config/config.env' });
}

import express from 'express';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import errorMiddleware from './middleware/error.js';

// ESM dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


//   MIDDLEWARES
// Body parser (fix 413 Payload Too Large)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Cookies
app.use(cookieParser());

// File upload
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    useTempFiles: true,
  })
);


   //API ROUTES

app.use('/api/v1', productRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', paymentRoutes);


  // ERROR HANDLER (AFTER API)


app.use(errorMiddleware);


  // FRONTEND (PRODUCTION)

app.use(
  express.static(path.join(__dirname, '../Frontend/boutique/dist'))
);

app.use(/.*/, (_, res) => {
  res.sendFile(
    path.resolve(__dirname, '../Frontend/boutique/dist/index.html')
  );
});

export default app;

