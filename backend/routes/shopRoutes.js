import express from 'express'
const router = express.Router()
import { getShops, getShopById } from '../controllers/shopController.js'

router.route('/').get(getShops)
router.route('/:id').get(getShopById)

export default router
