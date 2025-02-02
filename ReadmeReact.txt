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



