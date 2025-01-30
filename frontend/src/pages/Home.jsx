import React from "react";

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <h1 className="hero-title">
            Empowering Innovation with <span className="highlight">AI & IT</span>
          </h1>
          <p className="hero-subtitle">
            Transforming businesses with cutting-edge technology and intelligent solutions.
          </p>
          <a href="#services" className="cta-button">
            Explore Our Services
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">About SATRI</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                SATRI is a leading IT and AI company, dedicated to delivering innovative solutions that drive business growth. Our team of experts specializes in artificial intelligence, machine learning, cloud computing, and software development. Our mission is to help businesses leverage technology to stay ahead of the competition and unlock new opportunities.
              </p>
              <p>
                With a focus on innovation and customer satisfaction, we work closely with our clients to develop tailored solutions that meet their unique needs. Whether you're looking to automate processes, improve operational efficiency, or build scalable software, SATRI is your trusted technology partner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3 className="service-title">AI Solutions</h3>
              <p className="service-description">
                Harness the power of artificial intelligence to automate processes, analyze data, and make smarter decisions. We provide cutting-edge AI solutions tailored to your business needs.
              </p>
            </div>
            <div className="service-card">
              <h3 className="service-title">Cloud Computing</h3>
              <p className="service-description">
                Our cloud computing services offer scalable, flexible, and secure solutions. We help you move your operations to the cloud, reduce costs, and increase efficiency.
              </p>
            </div>
            <div className="service-card">
              <h3 className="service-title">Software Development</h3>
              <p className="service-description">
                We specialize in building custom software solutions that are designed to solve your business challenges. Our development team ensures quality and performance with every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-form">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
