const mysql = require('mysql')
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'koboy',
    port: '3307'
})

module.exports = db

// kanjut