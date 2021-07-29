import express from 'express'
const router = express.Router()
import {
  getEvents,
  getEventById,
  deleteEvent,
  createEvent,
  updateEvent,
  getEventHome,
} from '../controllers/eventController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getEvents).post(protect, admin, createEvent)
router.get('/eventhome', getEventHome)
router
  .route('/:id')
  .get(getEventById)
  .delete(protect, admin, deleteEvent)
  .put(protect, admin, updateEvent)
export default router
