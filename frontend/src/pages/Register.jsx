import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  const goToLogin = ()=>{
    navigate("/login")
  }
  return (
    <>
      <section className="register-section">
        <main>
          <div className="registration-container">
            <div className="form-container">
              <h1 className="form-title">Registration Form</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    placeholder="Enter your username"
                    required
                  />
                </div>
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
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={user.phone}
                    onChange={handleInput}
                    placeholder="Enter your phone number"
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
                  Register Now
                </button>
              </form>
              <div className="form-footer">
              <p>
                  Already have an account?{" "}
                  <button className="go-to-login-btn" onClick={goToLogin}>
                    Login Here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
export default Register;