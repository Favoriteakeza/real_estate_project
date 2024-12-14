import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./resetPassword.css";

const ResetPassword = ({ url }) => {
    const { token } = useParams();
    const navigate = useNavigate()
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await axios.post(`${url}api/users/reset-password`, { token, newPassword });
            setMessage(response.data.message);
            navigate("/login")
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong.");
        }
    };

    return (
       
        <div className="signup__home sign__bg">
        <div className="signup__card">
          <div className="signup__forms">
            <h2 className="signup__header">Set a New Password</h2>
            {message && <p className="success">{message}</p>}
              {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="sign__form">
              <label className="login__label">New Password</label>
              <input
                type="password"
                placeholder="Enter your new password"
                className="login__input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
             
             <button type="submit" className="form__btn">Reset Password</button>
            </form>
          </div>
        </div></div>
    );
};

export default ResetPassword;
