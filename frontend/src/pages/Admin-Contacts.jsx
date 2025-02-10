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
          Authorization: `${authAuthorizationToken}`, // Assuming the API expects Bearer token
          "Content-Type":"application/json",
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
          Authorization:  ` ${authAuthorizationToken}`, // Assuming the API expects Bearer token
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