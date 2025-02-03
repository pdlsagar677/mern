import express from "express";
import { services, postService } from "../controllers/service-controller.js"; // Import the controllers

const router = express.Router();




// Correct route for posting a new service (POST request)
router.route("/service").post(postService);

// Correct route for fetching all services (GET request)
router.route("/service").get(services);



export default router;
