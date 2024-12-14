import React, { useEffect, useRef } from "react";
import "./about.css";
import { MdGroups } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
const About = () => {
  const whyChooseUsRef = useRef(null);


  const location = useLocation();
  
  // useEffect to scroll after the page is loaded
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      const sectionRef = {
        "whyChooseUs": whyChooseUsRef,
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
    <div className="about"   id="about">
       <h1 className="about__header" ref={whyChooseUsRef} id="whyChooseUs">
        Why You Choose Us?
      </h1>
      <p className="about__p">we provide full Services</p>
      <div className="about__home">
        <div className="about__card">
          <div className="about__icon">
            <MdGroups className="about__img" />
          </div>
          <div className="about__content">
            <h2 className="content__headers">Trusted by Thousands</h2>
            <p>
              we work with over a thousand of people from all part of Country
              and Africa{" "}
            </p>
          </div>
        </div>
        <div className="about__card">
          <div className="about__icon">
            <FaHouseUser className="about__img images" />
          </div>
          <div className="about__content">
            <h2 className="content__headers">Dream House</h2>
            <p>we have all types of houses we are here to serve our client </p>
          </div>
        </div>
        <div className="about__card">
          <div className="about__icon">
            <MdPayments className="about__img images" />
          </div>
          <div className="about__content">
            <h2 className="content__headers">Easy&Fast Payment</h2>
            <p>
              we work with over a thousand of people from all part of Country
              and Africa{" "}
            </p>
          </div>
        </div>
      </div>
    </div><Footer /></>
  );
};

export default About;
