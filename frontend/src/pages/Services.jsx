import { useEffect } from "react";
import { useAuth } from "../store/auth"; // Import the updated useAuth hook
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios"; // Import axios

// Function to fetch services from the backend using axios
const getServiceData = async (setServices) => {
  try {
    const response = await axios.get("http://localhost:5000/api/data/service"); // Using axios to fetch data

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
  const { services = [], setServices, isLoggedIn } = useAuth(); // Ensure services defaults to an empty array from the context
  const navigate = useNavigate(); // Hook to navigate to login or register page

  // If not logged in, redirect to the login page
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/service"); // Redirect to login page if user is not logged in
    } else {
      // Fetch services if logged in and services are not already loaded
      if (services.length === 0) {
        getServiceData(setServices); // Fetch services if not yet loaded
      }
    }
  }, [isLoggedIn, services, setServices, navigate]); // Add necessary dependencies to the effect

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
