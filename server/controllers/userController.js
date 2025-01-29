import userModel from "../models/authModel.js";


export const getUserData = async (req, res) => {
  try {
    const user = req.user;  // Use the user data attached by the middleware

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


;
