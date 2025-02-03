import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

const Contact = () => {
  const [data, setData] = useState(defaultContactFormData);
  const { user, isLoggedIn } = useAuth(); // Access user data and login status from AuthContext

  useEffect(() => {
    // Pre-fill form with user data if user is logged in
    if (user) {
      setData({
        username: user.username || "",
        email: user.email || "",
        message: "",
      });
    }
  }, [user]); // Runs whenever user data changes

  // Handle input changes for the form fields
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleContactForm = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("You must be logged in to send a message.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert(responseData.message || "Your message has been sent successfully!");
        setData(defaultContactFormData); // Reset the form data
        console.log(responseData);
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">You must be logged in to contact us</h1>
        
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Contact Us</h1>
        </div>
        <div className="container grid grid-half-cols">
  

          <section className="section-form">
            <form onSubmit={handleContactForm}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={data.username}
                  onChange={handleInput}
                  autoCapitalize="off"
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={handleInput}
                  autoCapitalize="off"
                  required
                />
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  value={data.message}
                  onChange={handleInput}
                  required
                ></textarea>
              </div>

              <div>
                <button type="submit">Send Message</button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};

export default Contact;
