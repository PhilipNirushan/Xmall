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

// @desc  Create as event
// @route POST /api/events
// @access Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const event = new Event({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/Images/shops/sample.jpg',
    category: 'Sample category',
    numReviews: 0,
    countInStock: 0,
    description: 'Sample description',
    host: 'Sample host',
    time: 'Sample time',
    startDate: 'Sample start date',
    endDate: 'Sample end date',
  })

  const createdEvent = await event.save()
  res.status(201).json(createdEvent)
})

// @desc  Update an event
// @route PUT /api/events/:id
// @access Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    category,
    description,
    countInStock,
    host,
    time,
    startDate,
    endDate,
  } = req.body

  const event = await Event.findById(req.params.id)

  if (event) {
    ;(event.name = name),
      (event.price = price),
      (event.image = image),
      (event.category = category),
      (event.description = description),
      (event.countInStock = countInStock),
      (event.host = host),
      (event.time = time),
      (event.startDate = startDate),
      (event.endDate = endDate)

    const updatedEvent = await event.save()
    res.json(updatedEvent)
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

export { getEvents, getEventById, deleteEvent, createEvent, updateEvent }
