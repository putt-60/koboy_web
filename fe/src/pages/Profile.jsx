// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const API_GET = "http://localhost:3000/get/data";
  // asumsi update: PUT http://localhost:3000/get/data/:id

  // ambil email login jika Anda simpan sebelumnya (opsional)
  const storedEmail = localStorage.getItem("userEmail") || "";

  const [id, setId] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(storedEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Ambil data user dari backend saat komponen mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(API_GET);
        const users = Array.isArray(res.data) ? res.data : [];
        // cari berdasarkan email yang tersimpan; jika tidak ada, ambil user pertama
        let found = null;
        if (storedEmail) found = users.find((u) => u.email === storedEmail);
        if (!found && users.length > 0) found = users[0];

        if (found) {
          setId(found.id || found._id || null);
          setUsername(found.username || "");
          setEmail(found.email || "");
          // jangan set password dari server dalam produksi; ini contoh cepat
          setPassword(found.password || "");
        }
      } catch (err) {
        console.error("GET /get/data failed:", err);
        // fallback: ambil dari localStorage jika tersedia
        setUsername(localStorage.getItem("userName") || "");
        setEmail(localStorage.getItem("userEmail") || storedEmail || "");
        setPassword(localStorage.getItem("userPassword") || "");
      }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // simpan perubahan ke backend (PUT), fallback lokal jika gagal
  const handleSave = async () => {
    if (!username || !email) {
      alert("Username dan email harus diisi.");
      return;
    }

    setLoading(true);
    try {
      // jika id tersedia, lakukan PUT langsung
      if (id) {
        const updateUrl = `${API_GET}/${id}`;
        const payload = { username, email, password };
        console.log("PUT", updateUrl, payload);
        await axios.put(updateUrl, payload);
        // sync lokal untuk tampilan cepat
        localStorage.setItem("userName", username);
        localStorage.setItem("userEmail", email);
        if (password) localStorage.setItem("userPassword", password);
        window.dispatchEvent(new Event("profileUpdate"));
        alert("Profil berhasil diperbarui di server.");
      } else {
        // jika id tidak ada, coba cari user dahulu lalu PUT, atau simpan lokal
        const res = await axios.get(API_GET);
        const users = Array.isArray(res.data) ? res.data : [];
        const found = users.find((u) => u.email === email || u.username === username);
        if (found && (found.id || found._id)) {
          const userId = found.id || found._id;
          await axios.put(`${API_GET}/${userId}`, { username, email, password });
          localStorage.setItem("userName", username);
          localStorage.setItem("userEmail", email);
          if (password) localStorage.setItem("userPassword", password);
          window.dispatchEvent(new Event("profileUpdate"));
          alert("Profil berhasil diperbarui di server.");
        } else {
          // fallback: simpan lokal
          localStorage.setItem("userName", username);
          localStorage.setItem("userEmail", email);
          if (password) localStorage.setItem("userPassword", password);
          window.dispatchEvent(new Event("profileUpdate"));
          alert("User tidak ditemukan di server. Data disimpan lokal.");
        }
      }
    } catch (err) {
      console.error("Save error:", err);
      // tampilkan detail bila ada response
      if (err.response) {
        console.error("Response status:", err.response.status, "data:", err.response.data);
        alert(`Gagal menyimpan ke server: ${err.response.status}`);
      } else {
        alert("Gagal menyimpan ke server (cek console). Perubahan disimpan lokal.");
      }
      // fallback: simpan lokal
      try {
        localStorage.setItem("userName", username);
        localStorage.setItem("userEmail", email);
        if (password) localStorage.setItem("userPassword", password);
        window.dispatchEvent(new Event("profileUpdate"));
      } catch (e) {
        console.error("Fallback local save failed:", e);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("userAvatar");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    window.dispatchEvent(new Event("logout"));
    navigate("/");
  };

  return (
    <div className="profile-container">
      <div className="field">
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className="field">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="field">
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
        <button className="logout-btn" onClick={handleSave} disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </button>

        <button className="logout-btn" onClick={handleLogout}>Yakin Keluar?</button>
      </div>
    </div>
  );
}
