import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "axios"; // Import axios for HTTP requests
import { useAuth } from "../store/auth"; // Import useAuth for context

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const { storeTokenInLS } = useAuth(); // Destructure storeTokenInLS from useAuth

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
    console.log("Sending user data:", user); // Log user data to inspect before sending

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
        // Use response.data instead of responseData
        storeTokenInLS(response.data.token); // Corrected to use response.data

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

  return (
    <>
      <section className="register-section">
        <main>
          <div className="registration-container">
            <h1 className="form-title">Registration Form</h1>

            {/* Render error message if exists */}
            {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleInput}
                  placeholder="Username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleInput}
                  placeholder="Phone"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn-submit">
                Register Now
              </button>
            </form>

            <div className="form-footer">
              <p>
                Already have an account?{" "}
                <button className="go-to-login-btn" onClick={() => navigate("/login")}>
                  Login Here
                </button>
              </p>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Register;
