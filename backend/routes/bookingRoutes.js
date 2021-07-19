import express from 'express'
import {
  addNewBookings,
  getBookingById,
  updateBookingToPaid,
  getMyBookings,
  getBookings,
} from '../controllers/bookingController.js'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addNewBookings).get(protect, admin, getBookings)
router.route('/mybookings').get(protect, getMyBookings)
router.route('/:id').get(protect, getBookingById)
router.route('/:id/pay').put(protect, updateBookingToPaid)

export default router
