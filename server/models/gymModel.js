import mongoose from 'mongoose';

// Define the schema for the members collection
const memberSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  membershipExpiryDate: { type: Date, required: true },
  membershipRenewal: { type: Date, required: true },
  membershipType: { type: String, required: true }, 
  annualMembership: { type: String, required: true },
  notes1: { type: String, default: '' },
  notes2: { type: String, default: '' },
  notes3: { type: String, default: '' },
  length: { type: Number, required: true },
});

// Create the model for 'members' collection
const memberModel = mongoose.model('Member', memberSchema, 'members');

export default memberModel;