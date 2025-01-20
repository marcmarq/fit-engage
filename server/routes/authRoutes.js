import express from "express";
import {
    isAuthenticated,
    login,
    logout,
    register,
    resetPassword,
    sendResetOtp,
    sendVerifyOtp,
    verifyEmail,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

// Public Routes
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

// Protected Routes
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.get("/is-auth", userAuth, isAuthenticated);

// Check Session
authRouter.get("/check-session", userAuth, (req, res) => res.json({ loggedIn: true }));

export default authRouter;

