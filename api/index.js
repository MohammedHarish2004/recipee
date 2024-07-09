import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routes/auth.route.js';
import cuisineRouter from './routes/cuisine.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log(error.message);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); 
app.use('/api/cuisine', cuisineRouter); 
app.use('/api/auth', authRouter); 

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
