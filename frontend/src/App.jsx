// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/Services";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Error from "./pages/Errorpage";  // Use the correct import (default export)

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
