import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { createRequire } from 'module'; 

const require = createRequire(import.meta.url); // Use createRequire for CommonJS modules
const session = require('express-session'); // Correctly import express-session

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Allowed origins for CORS
const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Enable sending cookies with requests
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey', // Replace with a secure random string in production
  resave: false, // Prevent resaving the session if no changes were made
  saveUninitialized: true, // Save the session even if it's new
  cookie: {
    httpOnly: true, // Make the session cookie inaccessible to JavaScript
    secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
    sameSite: 'Strict', // Prevent CSRF attacks
    maxAge: 3600000, // Session duration (1 hour in ms)
  },
}));

// API Endpoints
app.get("/", (req, res) => res.send("API Working fine"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => console.log(`Server started on Port: ${port}`));

