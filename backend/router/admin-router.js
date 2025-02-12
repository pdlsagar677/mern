import express from "express";
import adminController from "../controllers/admin-controller.js";
import adminMiddleware from "../middleware/admin-middleware.js";
import authMiddleware from "../middleware/auth-middleware.js";
const router = express.Router();

// Define the get route for contact form submission, protecting it with authentication
router.route("/users").get(authMiddleware,adminMiddleware,adminController.getAllUsers);
router.route("/users/:id").get(authMiddleware,adminMiddleware,adminController.getUserById);

router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,adminController.deleteUserById);
//updating user details
router.route("/users/update/:id").patch(authMiddleware,adminMiddleware,adminController.updateUserById);

router.route("/contacts").get(authMiddleware,adminMiddleware,adminController.getAllContacts);
router.route("/contacts/delete/:id").delete(authMiddleware,adminMiddleware,adminController.deleteContactById);

export default router;
