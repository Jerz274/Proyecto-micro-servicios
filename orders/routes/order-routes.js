const express = require('express')
const router = express.Router()

const {
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  createOrder
} = require('../controllers/order-controller')


router.route('/').post(createOrder).get(getAllOrders)
router.route('/:id').get(getOrder).patch(updateOrder).delete(deleteOrder)

module.exports = router