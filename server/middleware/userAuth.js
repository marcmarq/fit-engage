import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js"; // Import the auth model

const userAuth = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    req.user = null; // Allow route to handle it
    return next(); // Continue to next middleware
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await authModel.findById(decodedToken.id);

    if (!user) {
      req.user = null; // Allow route to handle it
      return next();
    }

    req.user = { id: user._id, email: user.email, name: user.name };
    next();
  } catch (error) {
    req.user = null; // Token invalid/expired
    next(); // Don't block the request, let route handle it
  }
};

export default userAuth;

