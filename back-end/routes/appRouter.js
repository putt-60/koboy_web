const router = require('express').Router()
const db = require('../dbConnection')
const products = 'products'
const users = 'users'

///////////////////////////////////////////////////////////////////////////////////
router.get('/datas', (req, res) => {
    db.query(`select * from users`, (err, result) => {
        res.json(result)
    })
})
///////////////////////////////////////////////////////////////////////////////////

router.get('/products', (req, res) => {
    const sqlQuery = `
    SELECT 
    p.id,
    p.name,
    p.price,
    p.pictures,
    CASE 
    WHEN COUNT(v.id) = 0 THEN NULL
    ELSE GROUP_CONCAT(v.name ORDER BY v.id SEPARATOR ',')
    END AS variants
    FROM products p
    LEFT JOIN variants v ON p.id = v.product_id
    GROUP BY p.id, p.name, p.price, p.pictures;
    `

    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }

        // 🔥 Convert variants dari string → array
        const formatted = result.map(item => ({
            ...item,
            variants: item.variants
                ? item.variants.split(',')       // ubah jadi array
                : null                           // jika NULL tetap null
        }));

        res.json(formatted);
    });
});

router.delete('/delete', (req, res) => {
    const id = req.body.id
    const sqlQuery = `delete from products whrere id = ?`

    db.query(sqlQuery, [id], (err, result) => {
        res.json()
    })
})



module.exports = router