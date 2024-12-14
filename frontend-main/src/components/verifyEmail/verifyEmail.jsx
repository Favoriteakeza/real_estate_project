import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./verifyemail.css";

const VerifyEmail = ({ url }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Retrieve email from storage
  const email = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verificationCode) {
      setError("Please enter the verification code.");
      return;
    }

    const data = { email, otp: verificationCode }; // Backend API expects this payload
    const config = {
      method: "post",
      url: url + "api/users/verify-email",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios(config);
      if (response.status === 201) {
        setMessage("Email verified successfully!");
        navigate("/login");
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (error) {
      setError(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="signup__home sign__bg">
      <div className="signup__card">
        <div className="signup__forms">
          <h2 className="signup__header">Verify Email</h2>
          {error && <span className="error">{error}</span>}
          {message && <span className="message">{message}</span>}
          <form onSubmit={handleSubmit} className="sign__form">
            <label className="login__label">Verification Code</label>
            <input
              type="text"
              placeholder="Enter the verification code"
              className="login__input"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button type="submit" className="form__btn">
              Verify
            </button>
          </form>
        </div>
      </div>

      <div className="signup__content">
        <h2 className="headers">Verify Your Email</h2>
        <p className="headers__p">A verification code has been sent to {email}.</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
