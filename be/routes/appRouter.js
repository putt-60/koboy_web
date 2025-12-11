const router = require('express').Router()
const db = require('../dbConnection')
const products = 'products'
const users = 'users'


router.get('/data', (req, res) => {
    db.query(`select * from ${users}`, (err, result) => {
        res.json(result)
    })
})

router.get('/products', (req, res) => {
    const sqlQuery = `SELECT 
    p.id,
    p.name,
    p.price,
    p.pictures,
    GROUP_CONCAT(v.name) AS variants 
    FROM products p 
    LEFT JOIN variants v 
    ON p.id = v.product_id 
    GROUP BY p.id;
`
    db.query(sqlQuery, (err, result) => {
        res.json(result)
    })
})

module.exports = router;