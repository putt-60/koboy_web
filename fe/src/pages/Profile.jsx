import { useState } from "react";
import "../style/Profile.css";

export default function Profile() {
  const [name, setName] = useState("Nama Kamu");
  const email = "ini belum ada datanya ajg gw binguung/pass juga";

  const handlePhotoChange = () => {
    document.getElementById("profileUpload").click();
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      document.getElementById("profileImg").src = imgURL;
    }
  };

  return (
    <div className="profile-container">
      <div className="photo-wrapper" onClick={handlePhotoChange}>
        <img id="profileImg" src="/default.jpg" alt="profile" />
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
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Email</label>
        <input type="text" value={email} readOnly />
      </div>

      <div className="field">
        <label>Password</label>
        <input type="password" value="cihuy" readOnly />
      </div>

      <button className="logout-btn">Yakin Keluar?</button>
    </div>
  );
}
