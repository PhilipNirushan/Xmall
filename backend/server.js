import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
// const products = require('./data/products')
import shops from './data/shops.js'

dotenv.config()

connectDB()

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

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} port ${PORT}`))