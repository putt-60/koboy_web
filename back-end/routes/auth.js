const express = require("express");
const router = express.Router();
const db = require("../dbConnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SECRET KEY (jangan upload ke github)
const JWT_SECRET = "TOKO-SECRET-12345";

// ----------------- REGISTER -----------------
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Validasi input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  // Cek email apakah sudah ada
  const checkSql = `SELECT * FROM users WHERE email = ? LIMIT 1`;
  db.query(checkSql, [email], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json(err);

      const insertSql = `
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
      `;

      db.query(insertSql, [username, email, hashedPassword], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Registrasi berhasil" });
      });
    });
  });
});

// ----------------- LOGIN -----------------
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ? LIMIT 1`;
  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(400).json({ message: "Email tidak ditemukan" });
    }

    const user = result[0];

    // Cek password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json(err);

      if (!isMatch) {
        return res.status(400).json({ message: "Password salah" });
      }

      // Buat token JWT
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({
        message: "Login berhasil",
        token: token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    });
  });
});

module.exports = router;
