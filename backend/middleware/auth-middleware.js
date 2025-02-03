import jwt from 'jsonwebtoken';
import User from "../models/user-model.js";


const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
  
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Token not provided" });
    }
  
    // Remove the "Bearer " prefix
    const jwtToken = token.replace("Bearer", "").trim();
    console.log(jwtToken);
  
    try {
      // Verifying the token
      const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
      console.log(isVerified);
  
      // Get user details (don't include password)
      const userData = await User.findOne({ email: isVerified.email }).select("-password");
  
      if (!userData) {
        return res.status(401).json({ message: "User not found" });
      }
  
      // Attach user and token to the request
      req.token = token;
      req.user = userData;
      req.userID = userData._id;
  
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
  };
  export default authMiddleware;
