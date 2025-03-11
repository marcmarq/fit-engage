import express from 'express';
import { getMonthlyRevenue } from '../controllers/revenueController.js';

const router = express.Router();

// Get monthly revenue
router.get('/monthly-revenue', getMonthlyRevenue);

export default router;