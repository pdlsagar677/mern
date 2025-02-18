import User from "../models/user-model.js"; 
import Contact from "../models/contact-model.js"; 
import Service from "../models/service-model.js";

// *-------------------------------
//* Get All Users 📝
// *-------------------------------
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// *-------------------------------
//* Get Single User by ID 📝
// *-------------------------------
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }, { password: 0 });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// *-------------------------------
//* Delete User by ID 📝
// *-------------------------------
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

// *-------------------------------
//* Update User by ID 📝
// *-------------------------------
const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      { $set: updatedUserData }
    );

    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

// *-------------------------------
//* Get All Contacts 📝
// *-------------------------------
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contacts Found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

// *-------------------------------
//* Delete Contact by ID 📝
// *-------------------------------
const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};



//services posting ande delette

// *-------------------------------
//* Get Service by ID 📝
// *-------------------------------
const getServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const service = await Service.findOne({ _id: id }); // Fixed variable name

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

// *-------------------------------
//* Delete Service by ID 📝
// *-------------------------------
const deleteServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Service.deleteOne({ _id: id });
    return res.status(200).json({ message: "Service Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};



// GET - Fetch all services
const services = async (req, res) => {
  try {
    const response = await Service.find();

    // If no services are found
    if (!response || response.length === 0) {
      return res.status(404).json({ msg: "No services found" });
    }

    // Success, return services
    res.status(200).json({ msg: "Services found", data: response });
  } catch (error) {
    console.error("Error from the server:", error);
    res.status(500).json({ msg: "Error from the Backend", error: error.message });
  }
};

// POST - Create a new service
const postService = async (req, res) => {
  const { service, description, price, provider } = req.body;

  // Validation: Ensure all required fields are provided
  if (!service || !description || !price || !provider) {
    return res.status(400).json({ msg: "Please provide all required fields: service, description, price, provider" });
  }

  try {
    const newService = new Service({
      service,
      description,
      price,
      provider,
    });

    // Save the new service to the database
    await newService.save();

    res.status(201).json({ msg: "Service created successfully", data: newService });
  } catch (error) {
    console.error("Error while saving service:", error);
    res.status(500).json({ msg: "Error from the Backend", error: error.message });
  }
};

//edit services
const updateServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.status(200).json({ message: "Service updated successfully", data: updatedService });
  } catch (error) {
    next(error);
  }
};


export default {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  getAllContacts,
  deleteContactById,
  getServiceById,
  deleteServiceById,
  services, postService,updateServiceById, 
};
