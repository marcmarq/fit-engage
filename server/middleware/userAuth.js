import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js"; // Import the auth model

const userAuth = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated. Please log in.",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user's email or other details based on the decoded token
    const user = await authModel.findById(decodedToken.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Attach user info to the request object
    req.user = {
      id: decodedToken.id,
      email: user.email,
      name: user.name,  // Add any other details you want to pass
    };

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

export default userAuth;

