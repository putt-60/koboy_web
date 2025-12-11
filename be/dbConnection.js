const mysql = require('mysql')
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'koboy_database',
    // port: ''
})

module.exports = db