import express from 'express'
import {
  addNewBookings,
  getBookingById,
  updateBookingToPaid,
  getMyBookings,
} from '../controllers/bookingController.js'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addNewBookings)
router.route('/mybookings').get(protect, getMyBookings)
router.route('/:id').get(protect, getBookingById)
router.route('/:id/pay').put(protect, updateBookingToPaid)

export default router
