import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validasi sederhana (bisa diganti axios API)
    if (username === "" || password === "") {
      alert("Username dan password wajib diisi!");
      return;
    }

    // Simpan status login
    localStorage.setItem("isLoggedIn", "true");

    // Anda bisa simpan avatar default
    localStorage.setItem("userAvatar", "/assets/profile/default.png");

    // Beri tahu Navbar agar update
    window.dispatchEvent(new Event("login"));

    // Arahkan ke home
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="title">Login</h2>

        <label className="label">Username</label>
        <input
          type="text"
          className="input"
          placeholder="Masukkan username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-login" onClick={handleLogin}>
          Login
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
