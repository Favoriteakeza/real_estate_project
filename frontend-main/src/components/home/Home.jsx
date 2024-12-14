import React, { useEffect, useRef } from "react";
import { images } from "../../constants";
import "./home.css";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Home = () => {
  const HomeRef = useRef()
    
    
      const location = useLocation();
      
      // useEffect to scroll after the page is loaded
      useEffect(() => {
        if (location.state && location.state.scrollTo) {
          const sectionId = location.state.scrollTo;
          const sectionRef = {
           "Home": HomeRef
          }[sectionId];
      
          // Delay scroll by a bit to ensure the element is rendered
          if (sectionRef && sectionRef.current) {
            setTimeout(() => {
              sectionRef.current.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }
        }
      }, [location]);
  return (
    <><Navbar /> 
   <div className="home__page">
  <header className="home__header">
    <h1 ref={HomeRef} id="Home">Welcome to Real Estate Solutions</h1>
    <p>Your trusted partner in real estate development and investment.</p>
    <button className="cta__button">Get Started</button>
  </header>

  <section className="home__features" id="features">
    <h2>Key Features</h2>
    <ul>
      <li>Comprehensive property listings</li>
      <li>Customizable real estate solutions</li>
      <li>Professional consultation services</li>
    </ul>
   
  </section>

  
</div><Footer /></>
  );
};

export default Home;
