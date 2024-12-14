import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/real_estate.webp"

const Navbar = () => {
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the stored data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
   

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="home__navbar">
      <div className="navbar__logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="navbar__content">
        <a className="nav__link" href="/">Home</a>
        <a className="nav__link" href="/about">About Us</a>
        <a className="nav__link" href="/contact">Contact Us</a>
        <a className="nav__link" href="/projects">Projects</a>
        
        {/* Conditionally render the Dashboard link based on user role */}
        {userRole === "admin" && <a className="nav__link" href="/admin">Dashboard</a>} 

        {/* Conditionally render Login, Sign up, or Logout */}
        {userRole ? (
          <button onClick={handleLogout} className="nav__links">Logout</button>
        ) : (
          <>
            <Link className="nav__links" to="/login">Login</Link>
            <Link className="nav__links" to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
