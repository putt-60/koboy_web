import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email dan password wajib diisi!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      // Simpan token dan data user
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isLoggedIn", "true");

      // Avatar default
      localStorage.setItem("userAvatar", "/assets/profile/default.png");

      // Trigger navbar update
      window.dispatchEvent(new Event("login"));

      alert("Login berhasil!");
      navigate("/");

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Terjadi kesalahan server");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="title">Login</h2>

        <label className="label">Email</label>
        <input
          type="text"
          className="input"
          placeholder="Masukkan email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
