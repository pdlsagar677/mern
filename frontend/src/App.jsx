import React from 'react';
import { BrowserRouter ,  Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar/Navbar'; // Correct import (default export)
import Footer from './components/Footer/Footer';
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services"; // Ensure the name matches the file
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

import Error from "./pages/Errorpage"; // Ensure this is the correct path

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Services />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
