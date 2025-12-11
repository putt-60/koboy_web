import React from "react";
import { Link } from "react-router-dom";  
import "../style/Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="title">Login</h2>

        <label className="label">Username</label>
        <input type="text" className="input" placeholder="Masukkan username" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Masukkan password" />

        <button className="btn-login">
          <Link to="/" > Login</Link>
        </button>

        <p className="signup-text">
          Buat akun tekan ini kids
          <Link to="/register" className="signup-link"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
 