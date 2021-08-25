import express from 'express'
const router = express.Router()

import { textQuery, eventQuery } from '../chatbot/chatbot.js'

router.post('/textQuery', async (req, res) => {
  // Send request and log result
  let responses = await textQuery(
    req.body.text,
    req.body.userID,
    req.body.parameters
  )
  res.send(responses[0].queryResult)
})

router.post('/eventQuery', async (req, res) => {
  // Send request and log result
  let responses = await eventQuery(
    req.body.event,
    req.body.userID,
    req.body.parameters
  )
  res.send(responses[0].queryResult)
})

export default router
