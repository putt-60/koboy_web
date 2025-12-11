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

      const { token, user } = response.data; 
      // asumsi response.data = { token: "...", user: { id, username, email, avatar } }

      // Simpan token dan data user yang berguna
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");

      if (user) {
        // simpan user object sekaligus fields yang sering dipakai
        localStorage.setItem("user", JSON.stringify(user));
        if (user.id) localStorage.setItem("userId", String(user.id));
        if (user.email) localStorage.setItem("userEmail", user.email);
        if (user.username) localStorage.setItem("userName", user.username);
        if (user.avatar) {
          localStorage.setItem("userAvatar", user.avatar);
        } else {
          localStorage.setItem("userAvatar", "/assets/profile/default.png");
        }
      } else {
        // fallback jika backend tidak mengirim user object
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userAvatar", "/assets/profile/default.png");
      }

      // beri tahu komponen lain (Navbar, Profile) supaya refetch / re-render
      window.dispatchEvent(new Event("login"));

      alert("Login berhasil!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Terjadi kesalahan saat login. Periksa server / koneksi.");
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