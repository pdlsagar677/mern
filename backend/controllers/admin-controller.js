import User from "../models/user-model.js"; // Correct import statement
import Contact from "../models/contact-model.js"; // Correct import statement

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




//  fetching all the contacts
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