import asyncHandler from 'express-async-handler'
import Shop from '../models/shopModel.js'

// @desc  Fetch all shops
// @route GET/api/shops
// @access Public
const getShops = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
        // category: {
        //   $regex: req.query.keyword,
        //   $options: 'i',
        // },
      }
    : {}

  const shops = await Shop.find({ ...keyword })
  res.json(shops)
})

// @desc  Fetch single shop
// @route GET/api/shops/:id
// @access Public
const getShopById = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id)

  if (shop) {
    res.json(shop)
  } else {
    res.status(404)
    throw new Error('Shop not found')
  }
})

// @desc  Delete a shop
// @route DELETE /api/shops/:id
// @access Private/Admin
const deleteShop = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id)

  if (shop) {
    await shop.remove()
    res.json({ message: 'Shop removed' })
  } else {
    res.status(404)
    throw new Error('Shop not found')
  }
})

// @desc  Create a shop
// @route POST /api/shops
// @access Private/Admin
const createShop = asyncHandler(async (req, res) => {
  const shop = new Shop({
    name: 'Sample name',
    time: 'Sample time',
    user: req.user._id,
    image: '/Images/shops/sample.jpg',
    category: 'Sample category',
    numReviews: 0,
    description: 'Sample description',
    location: 'Sample location',
    phone: '000-000-0000',
    website: 'Sample website',
  })
  const createdShop = await shop.save()
  res.status(201).json(createdShop)
})

// @desc  Update a shop
// @route PUT /api/shops/:id
// @access Private/Admin
const updateShop = asyncHandler(async (req, res) => {
  const { name, time, image, category, description, location, phone, website } =
    req.body

  const shop = await Shop.findById(req.params.id)

  if (shop) {
    ;(shop.name = name),
      (shop.time = time),
      (shop.image = image),
      (shop.category = category),
      (shop.description = description),
      (shop.location = location),
      (shop.phone = phone),
      (shop.website = website)

    const updatedShop = await shop.save()
    res.json(updatedShop)
  } else {
    res.status(404)
    throw new Error('Shop not found')
  }
})

// @desc  Create new review
// @route POST /api/shops/:id/reviews
// @access Private
const createShopReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const shop = await Shop.findById(req.params.id)

  if (shop) {
    const alreadyReviewed = shop.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Shop already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    shop.reviews.push(review)

    shop.numReviews = shop.reviews.length

    shop.rating =
      shop.reviews.reduce((acc, item) => item.rating + acc, 0) /
      shop.reviews.length

    await shop.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Shop not found')
  }
})

// @desc  Get top rated shops
// @route GET  /api/shops/top
// @access Public
const getTopShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find({}).sort({ rating: -1 }).limit(3)

  res.json(shops)
})

export {
  getShops,
  getShopById,
  deleteShop,
  createShop,
  updateShop,
  createShopReview,
  getTopShops,
}
