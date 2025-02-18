import express from "express";
import adminController from "../controllers/admin-controller.js"; 
import adminMiddleware from "../middleware/admin-middleware.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

// Users
router.route("/users").get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router.route("/users/:id").get(authMiddleware, adminMiddleware, adminController.getUserById);
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById);
router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, adminController.updateUserById);

// Contacts
router.route("/contacts").get(authMiddleware, adminMiddleware, adminController.getAllContacts);
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteContactById);

// Services
// POST a new service
router.route("/services").post(authMiddleware, adminMiddleware, adminController.postService);

// GET all services
// GET all services
router.route("/services").get(authMiddleware,  adminController.services);

// GET a specific service by id
router.route("/services/:id").get(authMiddleware, adminMiddleware, adminController.getServiceById);

// DELETE a specific service by id
router.route("/services/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteServiceById);
//edit router
router.route("/services/edit/:id").patch(authMiddleware, adminMiddleware, adminController.updateServiceById);

export default router;
