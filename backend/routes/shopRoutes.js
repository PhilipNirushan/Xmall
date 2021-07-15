import express from 'express'
const router = express.Router()
import {
  getShops,
  getShopById,
  deleteShop,
} from '../controllers/shopController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getShops)
router.route('/:id').get(getShopById).delete(protect, admin, deleteShop)

export default router
