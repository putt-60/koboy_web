import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        username,
        email,
        password,
      });

      alert(response.data.message);
      navigate("/login");

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Terjadi kesalahan server");
      }
    }
  };

  const isFormValid = username && email && password;

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="title">Register</h2>

        <label className="label">Username</label>
        <input
          type="text"
          className="input"
          placeholder="Masukkan username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="label">Email</label>
        <input
          type="email"
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

        <button
          onClick={handleRegister}
          className="register-btn"
          disabled={!isFormValid}
        >
          Register
        </button>

        <p className="login-link">
          Balik nih <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
