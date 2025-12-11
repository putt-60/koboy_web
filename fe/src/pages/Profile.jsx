// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Profile.css";



const nama = 'putra'

export default function Profile() {
  const navigate = useNavigate();

  // ambil data awal dari localStorage (fallback default)
  const storedName = localStorage.getItem("userName") || "kqldb";  ////////////////////// Saat halaman Profile dibuka → Ambil data user dari backend (GET) 
  const storedAvatar = localStorage.getItem("userAvatar") || "/default.jpg";
  const storedEmail = localStorage.getItem("userEmail") || "p@domain.com";
  const storedPassword = localStorage.getItem("userPassword") || "";

  const [name, setName] = useState(storedName);
  const [email, setEmail] = useState(storedEmail);
  const [password, setPassword] = useState(storedPassword);
  const [avatarPreview, setAvatarPreview] = useState(storedAvatar);
  const [fileObject, setFileObject] = useState(null);

  // klik foto -> buka file picker
  const handlePhotoChange = () => {
    const input = document.getElementById("profileUpload");
    if (input) input.click();
  };

  // pilih file
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // batas ukuran (fallback ~4MB)
    const MAX = 4 * 1024 * 1024;
    if (file.size > MAX) {
      alert("Gambar terlalu besar. Pilih yang < ~4MB.");
      return;
    }

    setFileObject(file);
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.onerror = () => alert("Gagal membaca file. Coba lagi.");
    reader.readAsDataURL(file);
  };

  // helper untuk konversi file -> dataUrl
  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });

  const handleSave = async () => {
    try {
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email); /////////////////////////////////////////Saat klik tombol SIMPAN → Update data user ke backend (PUT / PATCH)
      // NOTE: menyimpan password di localStorage tidak aman untuk produksi.
      localStorage.setItem("userPassword", password);

      if (fileObject) {
        const dataUrl = await fileToDataUrl(fileObject);
        localStorage.setItem("userAvatar", dataUrl); ////////// Saat upload foto → upload juga ke backend
        setAvatarPreview(dataUrl);
        setFileObject(null);
      } else {
        if (avatarPreview && avatarPreview.startsWith("data:")) {
          localStorage.setItem("userAvatar", avatarPreview);
        }
      }

      window.dispatchEvent(new Event("profileUpdate"));
      alert("Profil tersimpan.");
    } catch (err) {
      console.error("Gagal menyimpan profil:", err);
      alert("Gagal menyimpan profil. Cek console.");
    }
  };

  // Logout
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

  useEffect(() => {
    const onStorage = () => {
      setAvatarPreview(localStorage.getItem("userAvatar") || "/default.jpg");
      setName(localStorage.getItem("userName") || "k");                    ////////////////////////////////Ini Output Sync Kalau ada perubahan dari localstorage dari tab lain
      setEmail(localStorage.getItem("userEmail") || "p@example.com");
      setPassword(localStorage.getItem("userPassword") || "");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
///////////////////////////////////////Inputnya dibawah sini
  return (
    <div className="profile-container">
      <div className="photo-wrapper" onClick={handlePhotoChange} style={{ cursor: "pointer" }}>
        <img
          id="profileImg"
          src={avatarPreview}
          alt="profile"
          style={{ width: 120, height: 120, objectFit: "cover", borderRadius: "50%" }}
        />
        <input
          type="file"
          id="profileUpload"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
      </div>

      <div className="field">
        <label>Nama</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> 
      </div>

      <div className="field">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />                   
      </div>

      <div className="field">
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      {/* Tombol Simpan (ditampilkan di atas tombol logout) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
        <button className="btn-save" onClick={handleSave}>
          Simpan
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Yakin Keluar?
        </button>
      </div>
    </div>
  );
}
