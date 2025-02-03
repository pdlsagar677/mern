import express from "express";
import { contactForm } from "../controllers/contact-controller.js"; // Import the named exports

const router = express.Router();

// Define the POST route for contact form submission, protecting it with authentication
router.route("/contact").post(contactForm);

export default router;
