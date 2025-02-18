import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate, Link } from "react-router-dom";

const AdminUsers = () => {
  const { authAuthorizationToken } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // Function to fetch all users data
  const getAllUsersData = async () => {
    try {
      console.log("Sending token:", authAuthorizationToken); // Debug log
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authAuthorizationToken,
        },
      });

      if (!response.ok) {
        // You may want to check response.status for 401/403
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Optionally redirect to login if unauthorized:
      if (error.message.includes("401") || error.message.includes("403")) {
        navigate("/login");
      }
    }
  };

  // Function to delete a user
  const deleteUser = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) return;
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authAuthorizationToken,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting user:", errorData.message);
        alert("Error deleting user: " + (errorData.message || "Unknown error"));
      } else {
        const data = await response.json();
        console.log(`User deleted: ${data.message}`);
        alert("User deleted successfully!");
        // Refresh the users list after deletion
        getAllUsersData();
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("Error deleting user");
    }
  };

  // On initial render, check token and fetch users
  useEffect(() => {
    if (!authAuthorizationToken) {
      navigate("/login");
    } else {
      getAllUsersData();
    }
  }, [authAuthorizationToken, navigate]);

  return (
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
            {users && users.length > 0 ? (
              users.map((curUser) => (
                <tr key={curUser._id}>
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
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminUsers;
