const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Import routers
const authRouter = require('./routes/auth');
const appRouter = require('./routes/appRouter');
const verifyRouter = require('./routes/verify'); // <-- ROUTE OTP DIPASANG

// Use routers
app.use('/get', appRouter);
app.use('/auth', authRouter);
app.use('/otp', verifyRouter);  // <-- PENTING AGAR OTP BERJALAN

// Default route
app.get('/', (req, res) => {
    res.send('mada faka');
});

// Jalankan server (hanya sekali)
app.listen(3000, () => {
    console.log(`Server berjalan di http://localhost:3000`);
});


// dari jalu tamfannnnnnn
