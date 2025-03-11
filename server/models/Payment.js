import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  date: { type: String, required: true }, 
  member: { type: String, required: true }, 
  amount: { type: Number, required: true }, 
  type: { type: String, required: true }, 
  expiry: { type: String, required: true }, 
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;