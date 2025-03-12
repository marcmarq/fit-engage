import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, index: true }, // Index for faster queries
    lastName: { type: String, required: true, index: true }, // Index for faster queries
    membershipExpiryDate: {
      type: Date,
      required: true, // No default value
    },
    membershipRenewal: {
      type: Date,
      required: true, // No default value
    },
    membershipType: {
      type: String,
      required: true,
      enum: ["Annual", "Monthly", "Walk-in"], // Validate membership type
    },
    annualMembership: { type: String, default: "No" }, // Default to "No"
    notes1: { type: String, default: "" }, // Optional field
    notes2: { type: String, default: "" }, // Optional field
    notes3: { type: String, default: "" }, // Optional field
    length: {
      type: Number,
      required: true,
      min: 1, // Ensure length is a positive number
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Add indexes for frequently queried fields
memberSchema.index({ firstName: 1, lastName: 1 });
memberSchema.index({ membershipExpiryDate: 1 });

const memberModel = mongoose.model("Member", memberSchema, "members");

export default memberModel;
