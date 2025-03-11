import express from 'express';
import Payment from '../models/Payment.js'; // Import the Payment model
import memberModel from '../models/gymModel.js'; // Import the Member model (gymModel)

const router = express.Router();

// Add a payment
router.post('/payments', async (req, res) => {
  try {
    const { date, member, amount, type, expiry } = req.body;

    // Step 1: Create a new payment
    const newPayment = new Payment({ date, member, amount, type, expiry });
    await newPayment.save(); // Save the payment to the database

    // Step 2: Update the member's membership details
    const memberName = member.split(' ');
    const firstName = memberName[0];
    const lastName = memberName[1];

    const updatedMember = await memberModel.findOneAndUpdate(
      { firstName, lastName },
      {
        membershipExpiryDate: expiry,
        membershipRenewal: expiry, // Set renewal date to the same as expiry (or adjust as needed)
        annualMembership: type === 'annual' ? 'Yes' : 'No', // Update annual membership status
      },
      { new: true } // Return the updated document
    );

    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Step 3: Return the created payment and updated member details
    res.status(201).json({ payment: newPayment, member: updatedMember });
  } catch (error) {
    res.status(500).json({ message: 'Error adding payment', error: error.message });
  }
});

// Get all payments
router.get('/payments', async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 }); // Fetch all payments, sorted by date
    res.status(200).json(payments); // Return the payments as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error: error.message });
  }
});

// Delete a payment by ID
router.delete('/payments/:id', async (req, res) => {
  try {
    const paymentId = req.params.id;

    // Find the payment by ID and delete it
    const deletedPayment = await Payment.findByIdAndDelete(paymentId);

    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment deleted successfully', deletedPayment });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment', error: error.message });
  }
});

export default router;