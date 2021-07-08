import express from 'express'
const router = express.Router()
import { getShops, getShopsById } from '../controllers/shopController.js'

router.route('/').get(getShops)

router.route('/:id').get(getShopsById)

export default router
