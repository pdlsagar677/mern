SETUP FOR BACKEND
1.create server folder
install package json file
2.npm init -y

then  cd server
3.npm i express

4.install ndodemon too and add in package json file

server.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Satri Mernstack");
});

app.get("/register", (req, res) => {
  res.status(200).json({ msg: "registration successful" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});




 "scripts": {
    "dev":"nodemon server.js"
  },

start server= npm run dev



//CREATING ROUTING
---create router folder and auth-router.js---
const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).send("welcome to home page");
});

router.route("/register").get((req, res) => {
  res.status(200).json({ msg: "Registration successful from router" });
});
//option
router.get("/,(req,res)=>{
     res.status(200).send("welcome to home page");
});




module.exports = router;

-----then change the server file as----
const express = require("express");
const app = express();
const router = require("./router/auth-router");

app.use("/api/auth", router);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});




//CREATING CONTROLLERS
create a controllers folder in server
--create a file called auth-controller.js--

// creatnig home controler
const home = async (req, res) => {
    try {
      res.status(200).json({ msg: "Welcome to our home page" });
    } catch (error) {
      console.log(error);
    }
  };



//creating register controller
  const register = async (req, res) => {
    try {
      res.status(200).send({ message: "registration page" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  module.exports = { home, register };


  change in auth-router.js

  const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller")

router.route("/").get((authControllers.home));

router.route("/register").get(authControllers.register);
router.route("/register").post(authControllers.register);

module.exports = router;



use postman to demonstrate
const register = async (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);
    // res.status(201).json({ message: "User registered successfully" });
    res.status(200).json({ msg: data });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { home, register };

app.use(express.json()); add in server.js


CONNECTING MONGODB DATA BASE


create a folder called utils then create a file called db.js
const mongoose = require("mongoose");

const URI = "mongodb uri";

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection successful to DB");
  } catch (error) {
    console.error("database connection fail");
    process.exit(0);
  }
};

module.exports = connectDb;

change server file to 

const express = require("express");
const app = express();
const router = require("./router/auth-route");
const connectDb = require("./utils/db");

// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", router);

const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});


SECURING PRIVATAE DATA IN .ENV file

install dotenv file
also install mongoose to and mongodb too
npm i dotenv
create a .env file iin server

require("dotenv").config();

const express = require("express");
const app = express();
const router = require("./routes/auth-route");
const connectDb = require("./utils/db");

// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", router);

const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
}); change in server.js




change data base to this 
const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/mern_admin_panel";
const URI = process.env.MONGODB_URI;
console.log(URI);

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection successful to DB");
  } catch (error) {
    console.error("database connection fail");
    process.exit(0);
  }
};

module.exports = connectDb;


in.env file 
MONGODB_URI = URI

use process .env in the file to access private data



CREATING USER SCHEMA AND MODEL FOR USER
create a model folder on server
create a file called 
user-model.js


const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// define the model or the collection name
export const User = new mongoose.model("USER", userSchema); 
add this in folder



storing data in data base 
auth-controller.js
const User = require (''./models/user-model");

const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    // const data = req.body;
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    // res.status(201).json({ message: "User registered successfully" });
    res.status(201).json({ msg: userCreated });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { home, register };


NOW post the data from post man in json file
11 video
install bcrypt.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';  // Corrected import statement
import mongoose from 'mongoose';  // Correct import syntax
import bcrypt from 'bcryptjs';  // Correct import syntax
import jwt from 'jsonwebtoken';  // Correct import syntax
import dotenv from 'dotenv';
dotenv.config();

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Optional, but a good practice to make the email unique
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Password Hashing: The pre middleware is defined within the userSchema before creating the User model.
userSchema.pre('save', async function (next) {
  const user = this;
  console.log('actual data ', this);

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashedPassword;
    next();  // Proceed with saving the user document
  } catch (error) {
    return next(error);
  }
});

// Compare the provided password with the hashed password stored in the database
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password); // Compare the plain password with the hashed password
  } catch (error) {
    throw new Error('Error comparing password');
  }
};

// Generate JSON Web Token
userSchema.methods.generateToken = async function () {
  console.log('I am token');
  console.log('JWT Secret Key:', process.env.JWT_SECRET_KEY); // Check if secret is loaded
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY, // Ensure the secret key is available
      { expiresIn: '30d' }
    );
  } catch (error) {
    console.error('Token Error: ', error);
  }
};

// Define the model or the collection name
const User = mongoose.model('USER', userSchema);

export default User;  // Correct export syntax


change in auth controller
const userCreated = await User.create({ username, email, phone, password });

// res.status(201).json({ message: "User registered successfully" });
res.status(201).json({
  msg: "Registration Successful",
  token: await userCreated.generateToken(),
  userId: userCreated._id.toString(),
});



if not worked change router like this router.post('/register', authController.register); 


//creatating a login 
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare password using the comparePassword method
    const isPasswordValid = await userExist.comparePassword(password);

    if (isPasswordValid) {
      // Generate a token if the password is valid
      const token = await userExist.generateToken();
      res.status(200).json({
        message: 'Login successful',
        token: token,
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
};


//zod validation 
npm i zod

create a folder called vaidator
auth-validator.js
import {z} from 'zod';

// Creating an object schema for registration
const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(255, { message: "Username must not be more than 255 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(20, { message: "Phone must not be more than 20 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least 7 characters" })
    .max(1024, { message: "Password can't be greater than 1024 characters" }),
});

export default signupSchema;


create a folder called middlware 
validate-middleware.js


const validate = (schema) => async (req, res, next) => {
    try {
      // Parse the request body using the schema
      const parsedBody = await schema.parseAsync(req.body);
      req.body = parsedBody;
      return next();
    } catch (err) {
      const status = 422; // Unprocessable Entity
      const message = "Validation failed. Please fill in the input properly.";
      const extraDetails = err.issues.map((curElem) => curElem.message);
  
      // Return a structured error response to the client
      return res.status(status).json({
        status,
        message,
        extraDetails,
      });
    }
  };
  
 export default  validate;


 in auth-router.js import both the validator

import signupSchema from '../validators/auth-validator.js';
import validate from '../middleware/validate-middleware.js';

router.post('/register',validate(signupSchema), authController.register); 

creating error validation  as we are creating this coz we can pass every file form single file middlware
create a error-middleware.js
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Backend Error";
    const extraDetails = err.extraDetails || "Error from the Backend";
  
    console.error(
      `[${req.method}]  ${req.path} >> StatusCode:: ${status}, Message:: ${extraDetails} `
    );
  
    return res.status(status).json({ message, extraDetails });
  };
  export default  errorMiddleware;


  //update in server
  import errorMiddleware from './middleware/error-middleware.js';
app.use(errorMiddleware);



//creating a contact router 
contact-router.js
import express from "express";
import contactForm from "../controllers/contact-controller.js"; // Using `import` here

const router = express.Router();

router.route("/contact").post(contactForm);

export default router;

----create contcat controller---
import Contact from '../models/contact-model.js';

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Message not delivered" });
  }
};

export default contactForm;




create contact model

import { Schema, model } from'mongoose';
const contactSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});
// create a new collections(Model)
const Contact = new model("Contact", contactSchema);
 export default Contact;

---import route in server.js--
import contactRoute  from './router/contact-router.js'
app.use("/api/form", contactRoute);


connection mongodb and react js
npm i cors
server.js
import cors from 'cors';

const corsOptions= {
  origin:"http://localhost:5173",
  method:"GET, POST, PUT, DELETE, PATCH, HEAD",
  Credential:true,
};
app.use(cors(corsOptions));
add this in server .js

//create a user logic function that a user can get user data \
create a auth middleware
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

create a user controller
const user = async(req,res)=>{
  try{
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({msg:userData});

  }
  catch(error){
    console.log(`error from user route ${error}`);
  }
}

create a router for getting user data from verified token

router.get('/user', authMiddleware,authController.user); 


//creating a service schema ,service route, and service controller and post the data from post man


//create a admin-router 
import express from "express";
import getAllUsers from "../controllers/admin-controller.js";

const router = express.Router();

// Define the POST route for contact form submission, protecting it with authentication
router.route("/users").get(getAllUsers);

export default router;



create admin-cnotroller too
import User from "../models/user-model.js"; // Correct import statement

// *-------------------------------
//* getAllUsers Logic 📝
// *-------------------------------
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    console.log(users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
export default getAllUsers;

add  router in server file 
app.use("/api/admin",adminRoute);


create contact getting controller too 
create a admin router too for this 

import Contact from "../models/contact-model.js"; // Correct import statement

const getAllContacts = async (req, res) => {
    try {
      const contacts = await Contact.find();
      console.log(contacts);
      if (!contacts || contacts.length === 0) {
        return res.status(404).json({ message: "No Contacts Found" });
      }
      return res.status(200).json(contacts);
    } catch (error) {
      next(error);
    }
  };

  export default {getAllUsers,getAllContacts};


  adding jwt in admin dashboard
  create a admin middleware file 

  
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

and import auth and adminmiddleware in router file 
import express from "express";
import adminController from "../controllers/admin-controller.js";
import adminMiddleware from "../middleware/admin-middleware.js";
import authMiddleware from "../middleware/auth-middleware.js";
const router = express.Router();

// Define the get route for contact form submission, protecting it with authentication
router.route("/users").get(authMiddleware,adminMiddleware,adminController.getAllUsers);
router.route("/contacts").get(authMiddleware,adminMiddleware,adminController.getAllContacts);

export default router;
