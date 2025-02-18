import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth"; // Adjust the path as needed

const AdminServiceEdit = () => {
  const { id } = useParams();
  const { authAuthorizationToken } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    service: "",
    description: "",
    price: "",
    provider: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch service details by ID on mount
  const fetchServiceById = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/services/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": authAuthorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFormData({
          service: data.service,
          description: data.description,
          price: data.price,
          provider: data.provider,
        });
      } else {
        window.alert("Failed to fetch service details");
      }
    } catch (error) {
      console.error("Error fetching service:", error);
      window.alert("Error fetching service details");
    }
  };

  useEffect(() => {
    if (authAuthorizationToken && id) {
      fetchServiceById();
    }
  }, [authAuthorizationToken, id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/admin/services/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authAuthorizationToken,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        window.alert("Service updated successfully!");
        navigate("/admin/services"); // Navigate back to the admin services page
      } else {
        const errorData = await response.json();
        window.alert("Error updating service: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error updating service:", error);
      window.alert("Error updating service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-service">
      <h2>Edit Service</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="service">Service Name</label>
          <input
            type="text"
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="provider">Provider Name</label>
          <input
            type="text"
            id="provider"
            name="provider"
            value={formData.provider}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Service"}
        </button>
      </form>
    </div>
  );
};

export default AdminServiceEdit;
