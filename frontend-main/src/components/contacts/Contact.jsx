import React, { useEffect, useRef } from "react";
import { images } from "../../constants";
import "./contact.css";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Contact = () => {
    const ContactUsRef = useRef()
  
  
    const location = useLocation();
    
    // useEffect to scroll after the page is loaded
    useEffect(() => {
      if (location.state && location.state.scrollTo) {
        const sectionId = location.state.scrollTo;
        const sectionRef = {
         "ContactUS": ContactUsRef
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
    <div className="contact__home" id="contact">
     
      <h2 className="contact__header"  ref={ContactUsRef} id="ContactUS">
      Contact Us
      </h2>
      <div className="home__contact">
        <div className="contact__images">
          <div className="contact__sub">
            <p className="contact__p">We are Here to serve you</p>
            <img src={images.office} alt="office" />
          </div>
        </div>
        <div className="contact__content">
          <div className="contact__info">
            <form className="contact_form">
              <label className="form__label">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form__input"
              />
              <label className="form__label">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form__input"
              />
              <label className="form__label">subject</label>
              <textarea
                name="subject"
                id=""
                cols="30"
                rows="10"
                className="textarea"
              ></textarea>
              <button type="submit" className="form__btn">
                Submit
              </button>
            </form>
          </div>

          <div className="contact__social"></div>
        </div>
      </div>
    </div><Footer /></>
  );
};

export default Contact;
