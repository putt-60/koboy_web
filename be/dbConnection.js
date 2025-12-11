const mysql = require('mysql')
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',

    password: '12345',
    database: 'koboy_database',
    // port: ''
})

db.getConnection((err, connection) => {
    if (err) {
        console.log("MYSQL ERROR:", err);
    } else {
        console.log("MYSQL CONNECTED");
        connection.release();
    }
});


module.exports = db;

