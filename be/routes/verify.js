const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

let otpStore = {};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/send", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email wajib diisi" });

  const otp = generateOTP();
  otpStore[email] = {
    otp,
    expires: Date.now() + 5 * 60 * 1000,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "emailkamu@gmail.com",          
      pass: "password_aplikasi_gmail",      
    },
  });

  try {
    await transporter.sendMail({
      from: "emailkamu@gmail.com",
      to: email,
      subject: "Kode OTP Verifikasi",
      text: `Kode OTP kamu adalah ${otp}. Berlaku 5 menit.`,
    });

    res.json({ message: "OTP sudah dikirim ke email" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Gagal mengirim email" });
  }
});

router.post("/verify", (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore[email];
  if (!record)
    return res.status(400).json({ message: "OTP tidak ditemukan" });

  if (Date.now() > record.expires)
    return res.status(400).json({ message: "OTP sudah kadaluarsa" });

  if (record.otp !== otp)
    return res.status(400).json({ message: "Kode OTP salah" });

  delete otpStore[email];
  res.json({ message: "Verifikasi berhasil!" });
});

module.exports = router;
