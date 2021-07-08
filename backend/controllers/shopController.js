import asyncHandler from 'express-async-handler'
import Shop from '../models/shopModel.js'

// @desc  Fetch all shops
// @route GET/api/shops
// @access Public
const getShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find({})
  res.json(shops)
})

// @desc  Fetch single shop
// @route GET/api/shops/:id
// @access Public
const getShopsById = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id)

  if (shop) {
    res.json(shop)
  } else {
    res.status(404).json({ message: 'Shop Not Found' })
  }
})

export { getShops, getShopsById }
