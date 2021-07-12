import express from 'express'
import { addNewBookings } from '../controllers/bookingController.js'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addNewBookings)

export default router
