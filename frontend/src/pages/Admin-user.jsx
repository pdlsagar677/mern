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

  //deleting user 
 
  const deleteUser = async (id) => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    
    // If the user confirmed, proceed with deletion
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: authAuthorizationToken, // Assuming the API expects Bearer token
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(`User deleted: ${data.message}`); // Log the success message after deletion
  
          // Display a success message for 3 seconds
          alert("User deleted successfully!");
  
          // Optionally, you can add a setTimeout for a delayed message
          setTimeout(() => {
            alert("User deleted successfully!");
          }, 3000); // Show message after 3 seconds
        } else {
          const errorData = await response.json();
          console.error('Error deleting user:', errorData.message); // Log error message if deletion fails
        }
      } catch (error) {
        console.error('Error during fetch request:', error);
      }
    } else {
      console.log("User deletion cancelled.");
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