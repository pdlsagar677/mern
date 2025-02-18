import { useState, useEffect } from "react";
import { useAuth } from "../store/auth"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";

const AdminService = () => {
  const { authAuthorizationToken } = useAuth();
  const [formData, setFormData] = useState({
    service: "",
    description: "",
    price: "",
    provider: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  // Handle input changes for the new service form
  const handleChange = (e) => {
    setMessage({ type: "", text: "" });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch all services from the backend
  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/services", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": authAuthorizationToken,
        },
      });
      if (response.ok) {
        const result = await response.json();
        setServices(result.data);
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Handle form submission (post new service)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.service || !formData.description || !formData.price || !formData.provider) {
      setMessage({ type: "error", text: "All fields are required." });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/admin/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authAuthorizationToken,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json();
        setMessage({ type: "success", text: "Service added successfully!" });
        setFormData({ service: "", description: "", price: "", provider: "" });
        window.alert("Service added successfully!");
        // Refresh the services table after successful post
        fetchServices();
      } else {
        const errorData = await response.json();
        setMessage({ type: "error", text: errorData.message || "Error adding service" });
        window.alert("Error adding service: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error adding service:", error);
      setMessage({ type: "error", text: "Error adding service" });
      window.alert("Error adding service");
    } finally {
      setLoading(false);
    }
  };

  // Handle deletion of a service
  const handleDelete = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/admin/services/delete/${serviceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authAuthorizationToken,
        },
      });
      if (response.ok) {
        window.alert("Service deleted successfully!");
        // Remove the deleted service from state without re-fetching everything
        setServices(prevServices => prevServices.filter(service => service._id !== serviceId));
      } else {
        const errorData = await response.json();
        window.alert("Error deleting service: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      window.alert("Error deleting service");
    }
  };

  // Handle editing: navigate to the admin edit page
  const handleEdit = (serviceId) => {
    navigate(`/admin/services/${serviceId}/edit`);
  };

  // Fetch services when authAuthorizationToken is available
  useEffect(() => {
    if (authAuthorizationToken) {
      fetchServices();
    }
  }, [authAuthorizationToken]);

  return (
    <div className="service-post-form">
      <h2>Add a New Service</h2>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="service">Service Name</label>
          <input
            type="text"
            id="service"
            name="service"
            placeholder="Enter service name"
            value={formData.service}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter service description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="provider">Provider Name</label>
          <input
            type="text"
            id="provider"
            name="provider"
            placeholder="Enter provider name"
            value={formData.provider}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Table displaying all services */}
      <h2 style={{ marginTop: "2rem" }}>Services List</h2>
      {services.length > 0 ? (
        <table className="services-table" border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Provider</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((serviceItem, index) => (
              <tr key={index}>
                <td>{serviceItem.service}</td>
                <td>{serviceItem.description}</td>
                <td>{serviceItem.price}</td>
                <td>{serviceItem.provider}</td>
                <td>
                  <button onClick={() => handleEdit(serviceItem._id)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(serviceItem._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No services found.</p>
      )}
    </div>
  );
};

export default AdminService;
