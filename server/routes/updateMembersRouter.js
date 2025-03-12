import express from "express";
import Member from "../models/gymModel.js";

const router = express.Router();

// Update a member's status
router.post("/update-membership", async (req, res) => {
  try {
    const { firstName, lastName, membershipExpiryDate } = req.body;

    // Find the member and update their expiry date
    const updatedMember = await Member.findOneAndUpdate(
      { firstName, lastName },
      { membershipExpiryDate },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating member", error: error.message });
  }
});

export default router;
