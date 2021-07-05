import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import shops from './data/shops.js'
import events from './data/events.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req,res) => {
    res.send('API is running')
})


app.get('/api/events', (req,res) => {
    res.json(events)
})

app.get('/api/shops', (req,res) => {
    res.json(shops)
})

app.get('/api/events/:id', (req,res) => {
    const event = events.find((e) => e._id === req.params.id)
    res.json(event)
})

app.get('/api/shops/:id', (req,res) => {
    const shop = shops.find((s) => s._id === req.params.id)
    res.json(shop)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} port ${PORT}`.yellow.bold))