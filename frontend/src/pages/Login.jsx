import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../store/auth";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { storeTokenInLS } = useAuth();
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

        // Corrected line: store token from response.data
        storeTokenInLS(response.data.token);  // Access the token from response.data

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

export default Login;
