import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../style/Verify.css";

function Verify() {
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email) sendOtp();
  }, [email]);

  const sendOtp = async () => {
  setMsg("Mengirim OTP...");
  try {
    const res = await fetch("http://localhost:3000/otp/send", {   // <-- DIBENERIN
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMsg(data.message);
  } catch (e) {
    setMsg("Gagal mengirim OTP!");
  }
};


  const handleChange = (value, index) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");

    if (code.length < 6) {
      setMsg("Masukkan 6 digit OTP!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });

      const data = await res.json();
      setMsg(data.message);
    } catch (e) {
      setMsg("Kesalahan server.");
    }
    setLoading(false);
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2 className="verify-title">Verifikasi Akun</h2>

        <p className="verify-text">
          Kode OTP dikirim ke: <b>{email}</b>
        </p>

        <div className="otp-input-group">
          {otp.map((val, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              maxLength="1"
              className="otp-input"
              value={val}
              onChange={(e) => handleChange(e.target.value, i)}
            />
          ))}
        </div>

        <button className="btn-verify" onClick={handleSubmit} disabled={loading}>
          {loading ? "Memverifikasi..." : "Verifikasi"}
        </button>

        <p className="resend">
          Tidak menerima kode? <span className="resend-link" onClick={sendOtp}>Kirim ulang</span>
        </p>

        {msg && <p className="verify-message">{msg}</p>}
      </div>
    </div>
  );
}

export default Verify;
