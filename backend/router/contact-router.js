import express from "express";
import contactForm from "../controllers/contact-controller.js"; // Using `import` here

const router = express.Router();

router.route("/contact").post(contactForm);

export default router;
