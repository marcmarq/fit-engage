import mongoose from 'mongoose';

// Define the schema for the members collection
const memberSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  membershipExpiryDate: { type: Date, required: true },
  membershipRenewal: { type: Date, required: true },
  annualMembership: { type: String, required: true },
  notes1: { type: String, default: '' },
  notes2: { type: String, default: '' },
  notes3: { type: String, default: '' },
  length: { type: Number, required: true },
});

// Create the model for 'members' collection (instead of 'gyms')
const memberModel = mongoose.model('Member', memberSchema, 'members');  // Specify collection as 'members'

export default memberModel;

