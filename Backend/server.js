import dotenv from 'dotenv';

dotenv.config({
  path: './backend/config/config.env',
});

import express from 'express';
import { connectMongoDatabase } from './config/db.js';

const app = express();

app.use(express.json());

connectMongoDatabase();


app.get('/api/v1/products',(req,res)=>{
    res.status(201).json({message:'welcome'});
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
