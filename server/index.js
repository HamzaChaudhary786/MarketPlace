import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
dotenv.config()


const app = express();

const __dirname = path.resolve()

const allowedOrigins = ['http://localhost:5173', 'https://marketplace-bf8u.onrender.com'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Allow cookies to be sent with requests
}));


app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  })


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);



app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


app.use((err, req, res, next) => {

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json(
    {
      success: false,
      message,
      statusCode
    }
  )

})




app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});