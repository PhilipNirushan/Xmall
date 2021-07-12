import asyncHandler from 'express-async-handler'
import Booking from '../models/bookingModel.js'

// @desc  Create new booking
// @route POST /api/bookings
// @access Private
const addNewBookings = asyncHandler(async (req, res) => {
  const { bookingItems, paymentMethod, itemsPrice, totalPrice } = req.body

  if (bookingItems && bookingItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const booking = new Booking({
      bookingItems,
      user: req.user._id,
      paymentMethod,
      itemsPrice,
      totalPrice,
    })

    const createdBooking = await booking.save()

    res.status(201).json(createdBooking)
  }
})

export { addNewBookings }
