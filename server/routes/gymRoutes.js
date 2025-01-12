import express from 'express';
import {
    getMembershipInfo,
    updateUserProfile
} from '../controllers/gymController.js'; // Fixed import
import userAuth from '../middleware/userAuth.js';

const gymRouter = express.Router();

// Protected Route: Get Gym Membership Information
gymRouter.get('/membership', userAuth, getMembershipInfo);

// Protected Route: Update User Profile
gymRouter.put('/profile', userAuth, updateUserProfile);

export default gymRouter;

