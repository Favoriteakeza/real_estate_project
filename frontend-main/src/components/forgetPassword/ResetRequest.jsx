import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./resetRequest.css";

const ResetRequest  = ({ url }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(""); // Clear any previous errors
    setMessage(""); // Clear any previous messages

    // Input validation
    if (!email) {
        setError("Please enter your email address");
        return;
    }

    if (!validateEmail(email)) {
        setError("Invalid email format");
        return;
    }

    // Construct the request configuration
    const data = { email };
    const config = {
        method: "post",
        url:  url + "api/users/forgot-password",
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    };

    console.log("Sending reset request:", config); // Log request details for debugging

    try {
        // Make the API call
        const response = await axios(config);
        console.log("Response received:", response.data); // Log the API response

        // Handle the API response
        if (response.status === 200) {
            setMessage(response.data.message || "Reset link sent to your email."); // Display success message
        } else {
            setError(`Failed to send reset instructions: ${response.status}`); // Handle unexpected status codes
        }
    } catch (error) {
        console.error("Error during reset request:", error.response || error.message); // Log error details

        // Set user-friendly error message
        setError(
            error.response?.data?.error || "Something went wrong. Please try again later."
        );
    }
};
  return (
    <div className="signup__home sign__bg">
      <div className="signup__card">
        <div className="signup__forms">
          <h2 className="signup__header">Forgot Password</h2>
          {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit} className="sign__form">
            <label className="login__label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
           
           <button type="submit" className="form__btn">Send Reset Link</button>
          </form>
        </div>
      </div>

      <div className="signup__content">
        <h2 className="headers">Recover Your Account</h2>
        <p className="headers__p">We will send instructions to your email.</p>
      </div>
    </div>
  );
};

export default ResetRequest 