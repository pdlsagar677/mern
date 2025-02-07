import express from "express";
import adminController from "../controllers/admin-controller.js";
import adminMiddleware from "../middleware/admin-middleware.js";
import authMiddleware from "../middleware/auth-middleware.js";
const router = express.Router();

// Define the get route for contact form submission, protecting it with authentication
router.route("/users").get(authMiddleware,adminMiddleware,adminController.getAllUsers);
router.route("/contacts").get(authMiddleware,adminMiddleware,adminController.getAllContacts);

export default router;
