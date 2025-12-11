// const mysql = require('mysql')
// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'mahasiswa',
//     // port: ''
// })


// //////////////////////////////////////////////////////////////////////
// const router = require('express').Router()


// /////////////////////////////////////////////////////////////////////////
// const express = require('express')
// const app = express()


// app.get('/data', (req, res) => {
//     db.query('select * from data', (err, result) => {
//         res.json(result)
//     })
// })

 
// app.get('/', (req, res) => {
//     res.send('mada faka')
// })

// app.listen(3000, () => {
//     console.log(`http://localhost:3000`)
// })



////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const authRouter = require('./routes/auth')
const appRouter = require('./routes/appRouter')

app.use('/get', appRouter)
app.use('/auth', authRouter)

// ini dari branch

app.get('/', (req, res) => {
    res.send('mada faka')
})
app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})