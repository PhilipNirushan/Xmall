import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import eventRoutes from './routes/eventRoutes.js'
import shopRoutes from './routes/shopRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/events', eventRoutes)

app.use('/api/shops', shopRoutes)

app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} port ${PORT}`.yellow.bold
  )
)
