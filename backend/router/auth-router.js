import express from 'express';
import authController from '../controllers/auth-controller.js';  
import signupSchema from '../validators/auth-validator.js';
import validate from '../middleware/validate-middleware.js';
import authMiddleware from '../middleware/auth-middleware.js';



const router = express.Router();
router.get('/', authController.home); 

router.post('/register',validate(signupSchema), authController.register); 
router.post('/login', authController.login); 


router.get('/user', authMiddleware,authController.user); 



export default router;
