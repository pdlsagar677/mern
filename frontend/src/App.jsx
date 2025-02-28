import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Error from "./pages/Errorpage"; 
import AdminLayout from './components/layout/Admin-layout';
import AdminUser from './pages/Admin-user';
import AdminContacts from './pages/Admin-Contacts';
import AdminUpdate from './pages/Admin-Update';
import AdminService from './pages/Admin-Service';
import AdminServiceEdit from './pages/AdminService-Edit';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Services />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
        
        {/* Admin Routes with nested routes */}
        <Route path="/admin" element={<AdminLayout />} >
          <Route path="users" element={<AdminUser />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="services" element={<AdminService />} />
          <Route path="services/:id/edit" element={<AdminServiceEdit />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
