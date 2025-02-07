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
  
        navigate("/");
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
