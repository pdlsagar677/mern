import { useEffect } from "react";
import { useAuth } from "../store/auth"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Function to fetch services from the backend using axios
const getServiceData = async (setServices, token) => {
  try {
    const response = await axios.get("http://localhost:5000/api/admin/services", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token, // Pass the token from context
      },
    });
    if (response.status === 200) {
      setServices(response.data.data); // Update state with the fetched services data
    } else {
      console.error("Failed to fetch services");
    }
  } catch (error) {
    console.error("Error fetching services:", error);
  }
};

const Service = () => { 
  const { authAuthorizationToken, services = [], setServices, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Fetch services on mount and when relevant values change
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/service"); // Redirect if user is not logged in
    } else {
      if (services.length === 0) {
        getServiceData(setServices, authAuthorizationToken);
      }
    }
  }, [isLoggedIn, services, setServices, navigate, authAuthorizationToken]);

  // Listen for localStorage changes (e.g., when a new service is posted in another tab)
  useEffect(() => {
    const handleStorageChange = (event) => {
      // When the "newService" key is updated, re-fetch the service data.
      if (event.key === "newService") {
        getServiceData(setServices, authAuthorizationToken);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [setServices, authAuthorizationToken]);

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Our Services</h1>
      </div>

      <div className="container grid grid-three-cols">
        {services.length > 0 ? (
          services.map((curElem, index) => (
            <div className="card" key={index}>
              <div className="card-img">
                <img src="https://cdn.pixabay.com/photo/2023/07/24/01/31/plane-8145957_640.jpg" alt="design" width="200" />
              </div>
              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{curElem.provider}</p>
                  <p>{curElem.price}</p>
                </div>
                <h2>{curElem.service}</h2>
                <p>{curElem.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h1>No Services Found.</h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default Service;
