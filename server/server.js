import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import gymRouter from './routes/gymRoutes.js';
import userRouter from './routes/userRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import updateMembersRouter from './routes/updateMembersRouter.js';
import revenueRouter from './routes/revenueRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

connectDB(); // Connect to MongoDB

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API Endpoints
app.get('/', (req, res) => res.send('API Working fine'));
app.use('/api/auth', authRouter);
app.use('/api/gym', gymRouter);
app.use('/api/user', userRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/update-membership', updateMembersRouter);
app.use('/api/revenue', revenueRouter); 

app.listen(port, () => console.log(`Server started on Port: ${port}`));