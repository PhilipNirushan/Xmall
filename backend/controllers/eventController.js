import asyncHandler from 'express-async-handler'
import Event from '../models/eventModel.js'

// @desc  Fetch all events
// @route GET/api/events
// @access Public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({})
  res.json(events)
})

// @desc  Fetch single event
// @route GET/api/events/:id
// @access Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (event) {
    res.json(event)
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

// @desc  Delete a event
// @route DELETE /api/events/:id
// @access Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (event) {
    await event.remove()
    res.json({ message: 'Event removed' })
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

export { getEvents, getEventById, deleteEvent }
