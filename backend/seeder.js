import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import events from './data/events.js'
import shops from './data/shops.js'
import users from './data/users.js'
import User from './models/userModel.js'
import Shop from './models/shopModel.js'
import Event from './models/eventModel.js'
import Booking from './models/bookingModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Booking.deleteMany()
    await Event.deleteMany()
    await Shop.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleEvents = events.map(event => {
      return { ...event, user: adminUser }
    })

    await Event.insertMany(sampleEvents)

    const sampleShops = shops.map(shop => {
      return { ...shop, user: adminUser }
    })

    await Shop.insertMany(sampleShops)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Booking.deleteMany()
    await Event.deleteMany()
    await Shop.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.yellow.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
