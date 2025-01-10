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

// New Route: Check Session
authRouter.get("/check-session", userAuth, (req, res) => {
  return res.json({ loggedIn: true });
});

// For the specific check authenticated route
authRouter.get("/isAuthenticated", userAuth, (req, res) => {
  return res.json({ success: true });
});

export default authRouter;

