import gymModel from '../models/gymModel.js';

export const getMembershipInfo = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;  // Expecting the user to provide first and last name

    console.log(`Getting membership info for: ${firstName} ${lastName}`);  // Debugging log

    // Query the gymModel using first and last name
    const membershipInfo = await gymModel.findOne({ firstName, lastName });

    console.log(`Membership info fetched: ${JSON.stringify(membershipInfo)}`);  // Debugging log

    if (!membershipInfo) {
      console.log(`No membership info found for: ${firstName} ${lastName}`);  // Debugging log
      return res.status(404).json({ message: 'Membership information not found' });
    }

    res.status(200).json(membershipInfo);
  } catch (error) {
    console.error('Error fetching membership info:', error);  // Debugging log
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;  // Expecting first and last name for identifying the user
    const { membershipExpiryDate, membershipRenewal, annualMembership, notes1, notes2, notes3, length } = req.body;

    console.log('Request to update user profile:', req.body);  // Debugging log

    // Check for missing required fields
    if (!firstName || !lastName || !membershipExpiryDate || !membershipRenewal || !annualMembership || !length) {
      console.log('Missing required fields in request body');  // Debugging log
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Query and update the document by first and last name
    const updatedProfile = await gymModel.findOneAndUpdate(
      { firstName, lastName },
      { membershipExpiryDate, membershipRenewal, annualMembership, notes1, notes2, notes3, length },
      { new: true }
    );

    if (!updatedProfile) {
      console.log(`User not found: ${firstName} ${lastName}`);  // Debugging log
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Updated user profile:', updatedProfile);  // Debugging log
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating user profile:', error);  // Debugging log
    res.status(500).json({ message: 'Server error', error });
  }
};
