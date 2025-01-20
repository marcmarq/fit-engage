import express from 'express';
import {
  getMembershipInfo,
  getAllMembers,
  updateUserProfile,
} from '../controllers/gymController.js'; // Fixed import
import userAuth from '../middleware/userAuth.js';

const gymRouter = express.Router();

// Protected Route: Get Gym Membership Information (specific member)
gymRouter.get('/membership', userAuth, getMembershipInfo);

// Protected Route: Get All Membership Information
gymRouter.get('/membership/all', userAuth, getAllMembers);

// Protected Route: Update User Profile
gymRouter.put('/profile', userAuth, updateUserProfile);

export default gymRouter;

