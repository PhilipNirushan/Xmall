const express = require('express')
const products = require('./data/products')
const shops = require('./data/shops')
const app = express()

app.get('/', (req,res) => {
    res.send('API is running')
})

// app.get('/api/products', (req,res) => {
//     res.json(products)
// })

app.get('/api/shops', (req,res) => {
    res.json(shops)
})

// app.get('/api/products/:id', (req,res) => {
//     const product = products.find((p) => p._id === req.params.id)
//     res.json(product)
// })

app.get('/api/shops/:id', (req,res) => {
    const shop = shops.find((s) => s._id === req.params.id)
    res.json(shop)
})


app.listen(5000, console.log('Server running on port 5000'))