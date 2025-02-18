create all the component for react 
create loginpage
       Register page
       Homepage
       contact Page 
       About Us page 
       

connection of react and mongo db 


install axios in it

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "axios"; // Import axios for HTTP requests

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "", 
    phone: "",
    password: "",
  });

  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending user data:", user);  // Log user data to inspect before sending

    // Reset previous error messages
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register", 
        {
          username: user.username,
          email: user.email,
          phone: user.phone,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("Response status:", response.status); // Log the status code for debugging
      console.log("Response data:", response.data); // Log the response data

      // Check if the response status is either 200 or 201 (or any other success code)
      if (response.status >= 200 && response.status < 300) {
        alert("Registration successful");

        // Clear the form fields after successful registration
        setUser({ username: "", email: "", phone: "", password: "" });

        // Navigate to the login page after successful registration
        navigate("/login");
      } else {
        // Handle server-side errors (e.g., email already exists)
        setError(response.data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      // Set the error state to display error message
      setError("An error occurred. Please try again later.");
    }
  };


};

export default Register;
 

 create a login from too 
 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

 const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input field value
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", 
        user,  // `user` object will be sent in the request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        console.log("after login: ", response.data);
        navigate("/");  // Navigate to the home page or any other page after successful login
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      // Handle error, display error message to user (optional)
    }
  };
  return (
    <>
      <section className="login-section">
        <div className="login-container">
          <div className="login-image">
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
              fill="#60a5fa"
            >
              <circle cx="200" cy="200" r="150" stroke="black" strokeWidth="10" />
              <path
                d="M150 250 Q200 200, 250 250"
                stroke="#60a5fa"
                strokeWidth="10"
                fill="transparent"
              />
            </svg>
          </div>
          <div className="login-form">
            <h1 className="form-title">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="btn-submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export  default Login;


stroring jwt in local storage 
create  a folder called store
auth.jsx
import { createContext, useContext } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  return (
    <AuthContext.Provider value={{ storeTokenInLS }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
import it into the main jsx
 <AuthProvider>
      <App />
    </AuthProvider>
    now add it on register and login page

import {useAuth} and both one 
also define it
const {storeTokenInLS} = useAuth();
 storeTokenInLS(response.data.token);



//creating a logout function
create a logoutjsx

add the components in navbar too 


also in store.jsx
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  //   this is the get the value in either true or false in the original state of token
  let isLoggedIn = !!token;
  console.log("token", token);
  console.log("isLoggedin ", isLoggedIn);

  //   to check whether is loggedIn or not
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};



// creating a authencated contact form
import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";

const defaultContactFormData = {
  message: "",
};

const Contact = () => {
  const { user, isLoggedIn, token, loading } = useAuth(); // Get user data, auth status, token, and loading from context
  const [data, setData] = useState(defaultContactFormData);

  // If the user is logged in, set their name and email into the form automatically
  useEffect(() => {
    if (user) {
      setData({
        username: user.username || "",  // Set username from user if available
        email: user.email || "",        // Set email from user if available
        message: "", // Keep message empty for now
      });
    }
  }, [user]);

  // Handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission using axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If loading, prevent form submission
    if (loading) {
      alert("User data is still loading. Please wait.");
      return;
    }

    // Check if user is available and logged in
    if (!isLoggedIn) {
      alert("You must be logged in to send a message!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/form/contact",
        {
          username: data.username || "",  // Use the username entered in the form
          email: data.email || "",        // Use the email entered in the form
          message: data.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message || "Your message has been sent successfully!");
        setData(defaultContactFormData); // Reset the form data
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // Display loading message if data is still loading
  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Contact Us</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            {/* Add SVG or other content here */}
          </div>

          <section className="section-form">
            <form onSubmit={handleSubmit}>
              {/* Allow user to edit username and email */}
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={data.username || ""}  // Use data.username from the form state
                  onChange={handleInput} // Allow editing the username
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={data.email || ""}  // Use data.email from the form state
                  onChange={handleInput} // Allow editing the email
                  required
                />
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={data.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
            {!isLoggedIn && <p>Please log in to send a message.</p>} {/* Display message if user is not logged in */}
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=..."
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};

export default Contact;
change the auth jsx to 
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(""); // Store the token state
  const [user, setUser] = useState(""); // Store the user data
  const [services, setServices] = useState([]); // Store services data
  const [isLoading, setIsLoading] = useState(true);

  const authAuthorizationToken = `Bearer ${token}`;

  // Store token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // Check if user is logged in
  const isLoggedIn = !!token;

  // Logout function: Reset token, remove from localStorage, refresh page
  const LogoutUser = () => {
    setToken(""); // Reset token state
    localStorage.removeItem("token"); // Remove token from localStorage
    window.location.reload(); // Refresh the page
  };

  // Fetch user data from the server using the token
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5001/api/auth/user", {
        headers: {
          Authorization: authAuthorizationToken,
        },
      });

      if (response.status === 200) {
        setUser(response.data.userData);
        setIsLoading(false);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
    }
  };

  // Fetch services data
  services pages also added 
  const getServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/data/service");
      if (response.status === 200) {
        setServices(response.data.data);
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Service frontend error:", error);
    }
  };

  // Use effect hooks to load user and services data when token changes
  useEffect(() => {
    if (token) {
      userAuthentication();
      getServices();
    }
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser, // Pass the LogoutUser function to the context
        setToken, // Ensure setToken is available in the context
        user,
        services,
        authAuthorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
//changes in logout funionality and contact too 


//some changes in contact to show backend error message
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending user data:", user);
  
    setError(""); // Reset error state
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username: user.username,
          email: user.email,
          phone: user.phone,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);
  
      if (response.status >= 200 && response.status < 300) {
        alert("Registration successful");
        storeTokenInLS(response.data.token);
  
        setUser({ username: "", email: "", phone: "", password: "" });
  
        navigate("/login");
      } else {
        setError(response.data.message || "An error occurred. Please try again.");
        alert(response.data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
  
      if (error.response && error.response.data && error.response.data.extraDetails) {
        const errorMessages = error.response.data.extraDetails.join("\n"); // Format errors for alert
        setError(errorMessages);
        alert(errorMessages); // Show errors in an alert popup
      } else {
        const errorMessage = "An error occurred. Please try again later.";
        setError(errorMessage);
        alert(errorMessage);
      }
    }
  };


lets create a admin layout in components
import { NavLink, Outlet } from "react-router-dom";
import { FaUser, FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

const AdminLayout = () => {
  const { user,  } = useAuth();
  console.log("admin layout ", user);



  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">
                  <FaUser /> users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <FaMessage /> Contact
                </NavLink>
              </li>
             

              <li>
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
export default AdminLayout
 and cretae pages like admin user and admin contact page 
 and route them in a nested admin route 

 

  creating admin-users page 
  import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

 const AdminUsers = () => {
  const { authAuthorizationToken } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // Corrected: useState to initialize an empty array

  // Check if the user is an admin on page load
  useEffect(() => {
    if (!authAuthorizationToken) {
      // Redirect to login page if no token is found
      navigate("/login");
    } else {
      // Optionally fetch user data or perform admin-specific actions
      getAllUsersData();
    }
  }, [authAuthorizationToken, navigate]);

  // Function to fetch all users data
  const getAllUsersData = async () => {
    try {
      console.log(authAuthorizationToken);
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authAuthorizationToken, // Assuming the API expects Bearer token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data); // Set the fetched users data to state
      // console.log(`Users: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error("Error fetching users:", error); // Handle errors if needed
    }
  };

  
 



  useEffect(()=>{
    getAllUsersData();
  },[]);

  return (
    
    <>
    <section className="admin-users-section">
      <div className="container">
        <h1>Admin Users Control</h1>
      </div>
      <div className="container admin-users">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((curUser, index) => (
              <tr key={index}>
                <td>{curUser.username}</td>
                <td>{curUser.email}</td>
                <td>{curUser.phone}</td>
                <td>
                <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                </td>
              <td>
              <button onClick={() => deleteUser(curUser._id)}>Delete</button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </>
  );
};
export default AdminUsers;


creating admin contacts
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

 const AdminContacts = () => {
  const { authAuthorizationToken } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]); // Initialize contacts state with an empty array

  // Check if the user is an admin on page load
  useEffect(() => {
    if (!authAuthorizationToken) {
      // Redirect to login page if no token is found
      navigate("/login");
    } else {
      // Fetch contact data if token is found
      getAllContactsData();
    }
  }, [authAuthorizationToken, navigate]);

  // Function to fetch all contacts data
  const getAllContactsData = async () => {
    try {
      console.log(authAuthorizationToken);
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authAuthorizationToken, // Assuming the API expects Bearer token
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const data = await response.json();
      setContacts(data); // Set the fetched contacts data to state
      console.log(`Contacts: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error("Error fetching contacts:", error); // Handle errors if needed
    }
  };

const deleteContact = async (id) => {
  // Show a confirmation dialog
  const isConfirmed = window.confirm("Are you sure you want to delete this contact?");
  
  // If the user confirmed, proceed with deletion
  if (isConfirmed) {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authAuthorizationToken, // Assuming the API expects Bearer token
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Contact deleted: ${data.message}`); // Log the success message after deletion

        // Display a success message for 3 seconds
        alert("Contact deleted successfully!");
      } else {
        // Handle case where the deletion failed
        const errorData = await response.json();
        console.error('Error deleting contact:', errorData.message); // Log error message if deletion fails
        alert(`Error deleting contact: ${errorData.message}`);
      }
    } catch (error) {
      // Handle network or other unexpected errors
      console.error('Error during fetch request:', error);
      alert("An error occurred while deleting the contact.");
    }
  } else {
    console.log("Contact deletion cancelled.");
  }
};






  useEffect(()=>{
    getAllContactsData();
  },[]);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Contacts</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
               <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.username}</td> {/* Assuming 'name' is a field in the contact data */}
                  <td>{contact.email}</td>
                  <td>{contact.message}</td>
                 
                  <td>
                  <button onClick={() => deleteContact(contact._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
export default AdminContacts;

//creating admin update .jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const { id } = useParams();  // Get the user ID from the URL params
  const { authAuthorizationToken } = useAuth();  // Authorization token from context
  const navigate = useNavigate();  // Used to navigate after updating

  // Fetch the user data when component mounts or when `id` changes
  const getSingleUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "GET",
        headers: {
          Authorization: authAuthorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      setData(userData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleUserData();
    }
  }, [id]); // Only fetch when the `id` changes

  // Handle input field changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // Handle form submission to update the user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/update/${id}`, {
        method: "PATCH",  // Use PATCH for updating data
        headers: {
          "Content-Type": "application/json",
          Authorization: authAuthorizationToken,
        },
        body: JSON.stringify(data),  // Send updated user data
      });

      if (response.ok) {
        window.alert("User updated successfully!");  // Show success message
        navigate("/admin/users");  // Navigate to the users list or wherever needed
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Update User Data</h1>
      </div>

      {/* Main content section */}
      <div className="container grid grid-two-cols">
        {/* Form section */}
        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={data.username}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={data.email}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="phone">Mobile</label>
              <input
                type="text"
                name="phone"
                id="phone"
                autoComplete="off"
                value={data.phone}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <button type="submit" className="btn btn-submit">
                Update
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
export default AdminUpdate;
 and add in app jsx 
         <Route path="users/:id/edit" element={<AdminUpdate/>} />



//now reate a contact delete as like a user delettion too

and create a admin service page to post from admin page 
and edit page as like the previous users like age
