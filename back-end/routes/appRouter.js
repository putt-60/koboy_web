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
    db.query(`select * from ${products}`, (err, result) => {
        res.json(result)
    })
})















module.exports = router