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
