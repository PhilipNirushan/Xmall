import express from 'express'
const router = express.Router()
import {
  getEvents,
  getEventById,
  deleteEvent,
} from '../controllers/eventController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getEvents)
router.route('/:id').get(getEventById).delete(protect, admin, deleteEvent)

export default router
