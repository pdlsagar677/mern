import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";

const defaultContactFormData = {
  message: "",
};

const Contact = () => {
  const { user, isLoggedIn, token, loading } = useAuth(); // Get user data, auth status, token, and loading from context
  const [data, setData] = useState(defaultContactFormData);

  // If the user is logged in, set their name and email into the form automatically
  useEffect(() => {
    if (user) {
      setData({
        username: user.username || "",  // Set username from user if available
        email: user.email || "",        // Set email from user if available
        message: "", // Keep message empty for now
      });
    }
  }, [user]);

  // Handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission using axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If loading, prevent form submission
    if (loading) {
      alert("User data is still loading. Please wait.");
      return;
    }

    // Check if user is available and logged in
    if (!isLoggedIn) {
      alert("You must be logged in to send a message!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/form/contact",
        {
          username: data.username || "",  // Use the username entered in the form
          email: data.email || "",        // Use the email entered in the form
          message: data.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message || "Your message has been sent successfully!");
        setData(defaultContactFormData); // Reset the form data
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // Display loading message if data is still loading
  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Contact Us</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            {/* Add SVG or other content here */}
          </div>

          <section className="section-form">
            <form onSubmit={handleSubmit}>
              {/* Allow user to edit username and email */}
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={data.username || ""}  // Use data.username from the form state
                  onChange={handleInput} // Allow editing the username
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
                  value={data.email || ""}  // Use data.email from the form state
                  onChange={handleInput} // Allow editing the email
                  required
                />
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={data.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
            {!isLoggedIn && <p>Please log in to send a message.</p>} {/* Display message if user is not logged in */}
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=..."
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};

export default Contact;
