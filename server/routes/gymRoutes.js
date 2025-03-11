import express from 'express';
import {
  addNewMember,
  updateMemberById,
  deleteMemberById,
  getAllMembers,
} from '../controllers/gymController.js';
import userAuth from '../middleware/userAuth.js';

const gymRouter = express.Router();

// Register a new member
gymRouter.post('/membership', userAuth, addNewMember);

// Update a member by ID
gymRouter.put('/membership/edit', userAuth, updateMemberById);

// Delete a member by ID
gymRouter.delete('/membership', userAuth, deleteMemberById);

// Get all members
gymRouter.get('/membership/all', userAuth, getAllMembers);

export default gymRouter;