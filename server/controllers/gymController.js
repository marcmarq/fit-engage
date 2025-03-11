import gymModel from "../models/gymModel.js";

// Add a new member
export const addNewMember = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      membershipExpiryDate,
      membershipRenewal,
      membershipType, // Added membershipType
      annualMembership,
      notes1 = "",
      notes2 = "",
      notes3 = "",
      length,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !membershipExpiryDate ||
      !membershipRenewal ||
      !membershipType || // Added validation
      !annualMembership ||
      !length
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new member
    const newMember = new gymModel({
      firstName,
      lastName,
      membershipExpiryDate,
      membershipRenewal,
      membershipType, // Include membershipType
      annualMembership,
      notes1,
      notes2,
      notes3,
      length,
    });

    // Save the new member
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    console.error("Error adding new member:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a member by ID
export const updateMemberById = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;

    // Update the member
    const updatedMember = await gymModel.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a member by ID
export const deleteMemberById = async (req, res) => {
  try {
    const { _id } = req.body;

    const deletedMember = await gymModel.findByIdAndDelete(_id);

    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({ message: "Member deleted successfully", deletedMember });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all members
export const getAllMembers = async (req, res) => {
  try {
    const members = await gymModel.find();
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ message: "Server error", error });
  }
};