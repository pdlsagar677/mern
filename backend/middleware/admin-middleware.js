const adminMiddleware = async (req, res, next) => {
  try {
    // Ensure req.user exists before accessing isAdmin
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    // Check if user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied. User is not an admin." });
    }

    next(); // Proceed to next middleware
  } catch (error) {
    console.error("Admin Middleware Error:", error); // Log error for debugging
    res.status(500).json({ message: "Internal server error in admin middleware." });
  }
};

export default adminMiddleware;
