import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import "./login.css";
import { images } from "../../constants";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ url }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState(""); // 2FA code state
  const [error, setError] = useState("");
  const [is2FA, setIs2FA] = useState(false); // Track whether 2FA is required
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    try {
      // Step 1: Authenticate with email and password
      const response = await axios.post(url + "api/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // If 2FA is required
        setIs2FA(true);
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Something went wrong");
    }
  };

  const handle2FAVerify = async () => {
    try {
     
      const response = await axios.post("http://localhost:5000/api/users/verify-2fa", { email, code });
      console.log(response.data); // Check the response data
      if (response.status === 200) {
        console.log(response)
        setToken(response.data.token);
        // Handle successful login (redirect, etc.)
      } else {
        setError("Invalid 2FA code");
      }
    } catch (error) {
      setError("Error verifying 2FA code");
    }
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
  
      if (role.includes("admin")) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("token", token);
        navigate("/admin");
      }
      if (role.includes("client")) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "user");
        localStorage.setItem("token", token);
        navigate("/");
      }
    }
  }, [token, navigate]);
   

  return (
    <div className="login__home">
      <div className="login__card">
        <div className="login__images">
          <p className="login__p">Join Us Now</p>
          <div className="login__icons">
            <FaInstagram className="icon__login" />
            <FaXTwitter className="icon__login" />
            <FaWhatsapp className="icon__login" />
          </div>
          <img src={images.log} alt="login" />
        </div>
        <div className="login__content">
          <h2 className="login__header">Login</h2>
          {error && <span className="error">{error}</span>}
          <form onSubmit={handleLogin} className="login__form">
            <label className="login__label">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="login__label">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
           
             <Link to="/request-reset" className="login__links">
              forgot password?
            </Link>
            <button type="submit" className="form__btn">
              login
            </button>
            <Link to="/signup" className="login__links">
              Don't have an account? SignUp
            </Link>
          </form>

          {is2FA && (
            <div>
              <label className="login__label">2FA Code</label>
              <input
                type="text"
                placeholder="Enter 2FA code"
                className="login__input"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button onClick={() => handle2FAVerify()} className="form__btn">
                Verify 2FA
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
