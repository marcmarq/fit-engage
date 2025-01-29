import gymModel from '../models/gymModel.js';


// export const addNewMember = async (req, res) => {
//   try {
//     const { firstName, lastName, membershipExpiryDate, membershipRenewal, annualMembership, notes1, notes2, notes3, length } = req.body;

//     console.log('Request to add new member:', req.body); // Debugging log

//     // Check for missing required fields
//     if (!firstName || !lastName || !membershipExpiryDate || !membershipRenewal || !annualMembership || !length) {
//       console.log('Missing required fields in request body'); // Debugging log
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Create a new member document
//     const newMember = new gymModel({
//       firstName,
//       lastName,
//       membershipExpiryDate,
//       membershipRenewal,
//       annualMembership,
//       notes1,
//       notes2,
//       notes3,
//       length
//     });

//     // Save the new member to the database
//     const savedMember = await newMember.save();

//     if (!savedMember) {
//       console.log('Failed to save new member'); // Debugging log
//       return res.status(500).json({ message: 'Failed to save new member' });
//     }

//     console.log('New member added:', savedMember); // Debugging log
//     res.status(201).json(savedMember); // Respond with the newly created member
//   } catch (error) {
//     console.error('Error adding new member:', error); // Debugging log
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

export const addNewMember = async (req, res) => {
  try {
    // Map the incoming request body to match the MongoDB document structure
    const {
      firstName,
      lastName,
      membershipExpiryDate,
      membershipRenewal,
      annualMembership,
      notes1 = '',
      notes2 = '',
      notes3 = '',
      length,
    } = req.body;

    // Log the incoming request for debugging purposes
    console.log('Request to add new member:', req.body);

    // Check for missing required fields
    if (!firstName || !lastName || !membershipExpiryDate || !membershipRenewal || !annualMembership || !length) {
      console.log('Missing required fields in request body');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new member document with the mapped fields
    const newMember = new gymModel({
      firstName,
      lastName,
      membershipExpiryDate,
      membershipRenewal,
      annualMembership,
      notes1,
      notes2,
      notes3,
      length,
    });

    // Save the new member to the database
    const savedMember = await newMember.save();

    if (!savedMember) {
      console.log('Failed to save new member');
      return res.status(500).json({ message: 'Failed to save new member' });
    }

    console.log('New member added:', savedMember);
    res.status(201).json(savedMember); // Respond with the newly created member
  } catch (error) {
    console.error('Error adding new member:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateMemberByName = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const memberData = req.body; // This contains the updated member data

    const updatedMember = await gymModel.findOneAndUpdate(
      { firstName, lastName },
      { $set: memberData },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(200).json(updatedMember); // Respond with the updated member data
  } catch (error) {
    console.error("Error updating member by name:", error);
    res.status(500).json({ message: 'Error updating member', error });
  }
};


// Add the deleteMember function to handle the deletion of a member
export const deleteMember = async (req, res) => {
  try {
    const { firstName, lastName, membershipExpiryDate, membershipRenewal } = req.body; // Expecting the details in the body

    // Log the incoming request for debugging purposes
    console.log('Request to delete member:', req.body);

    // Find and delete the member matching the details
    const deletedMember = await gymModel.findOneAndDelete({
      firstName,
      lastName,
      membershipExpiryDate,
      membershipRenewal,
    });

    if (!deletedMember) {
      console.log('Member not found for deletion');
      return res.status(404).json({ message: 'Member not found' });
    }

    console.log('Deleted member:', deletedMember);
    res.status(200).json(deletedMember); // Respond with the deleted member data
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getMembershipInfo = async (req, res) => {
  try {
    const { firstName, lastName } = req.query; // Expecting query parameters for first and last name

    console.log(`Getting membership info for: ${firstName} ${lastName}`); // Debugging log

    // Query the gymModel using first and last name
    const membershipInfo = await gymModel.findOne({ firstName, lastName });

    console.log(`Membership info fetched: ${JSON.stringify(membershipInfo)}`); // Debugging log

    if (!membershipInfo) {
      console.log(`No membership info found for: ${firstName} ${lastName}`); // Debugging log
      return res.status(404).json({ message: 'Membership information not found' });
    }

    res.status(200).json(membershipInfo);
  } catch (error) {
    console.error('Error fetching membership info:', error); // Debugging log
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAllMembers = async (req, res) => {
  try {
    console.log('Fetching all membership information'); // Debugging log

    const allMemberships = await gymModel.find({});

    console.log(`Fetched all memberships: ${JSON.stringify(allMemberships)}`); // Debugging log

    res.status(200).json(allMemberships);
  } catch (error) {
    console.error('Error fetching all memberships:', error); // Debugging log
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName } = req.body; // Expecting first and last name for identifying the user
    const { membershipExpiryDate, membershipRenewal, annualMembership, notes1, notes2, notes3, length } = req.body;

    console.log('Request to update user profile:', req.body); // Debugging log

    // Check for missing required fields
    if (!firstName || !lastName || !membershipExpiryDate || !membershipRenewal || !annualMembership || !length) {
      console.log('Missing required fields in request body'); // Debugging log
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Query and update the document by first and last name
    const updatedProfile = await gymModel.findOneAndUpdate(
      { firstName, lastName },
      { membershipExpiryDate, membershipRenewal, annualMembership, notes1, notes2, notes3, length },
      { new: true }
    );

    if (!updatedProfile) {
      console.log(`User not found: ${firstName} ${lastName}`); // Debugging log
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Updated user profile:', updatedProfile); // Debugging log
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating user profile:', error); // Debugging log
    res.status(500).json({ message: 'Server error', error });
  }
};

