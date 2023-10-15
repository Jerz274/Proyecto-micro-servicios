require('dotenv').config()
const mongoose = require('mongoose')
const Order = require('../models/order')
const { StatusCodes } = require('http-status-codes')

const getAllService = async (req, res) => {
  const orders = await Order.find({}).populate('recipe')
  res.status(StatusCodes.OK).json({ orders })
}

const getSingleService = async (id, res) => {
  const order = await Order.findById(id).populate('recipe').lean()
  if (order) {
    res.status(StatusCodes.OK).json({ order })
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: `Order with id <${id}> does not exist`
      })
  }
}

const createService = async (body, req, res) => {
  const order = await Order.create(body)
  const io = req.io
  io.emit('order_created', order)
  res
    .status(StatusCodes.OK)
    .json({
      message: "Order successfully created!",
      order
    })
}

const updateService = async (id, body, req, res) => {
  const order = await Order
    .findOneAndUpdate(
      { _id: id },
      body,
      {
        new: true,
        runValidators: true
      }
    ).populate('recipe').lean()

  const io = req.io
  io.emit('order_updated', order)
  res
    .status(StatusCodes.OK)
    .json({
      message: "order successfully updated!",
      order
    })
}

const deleteService = async (id, res) => {
  const order = await Order.findOneAndDelete({ _id: id }).populate('recipe').lean()
  res
    .status(StatusCodes.OK)
    .json({
      message: "order successfully deleted",
      order: {
        id: order._id,
        name: order.name,
      }
    })
}

const deleteAllService = async (id, res) => {
  const order = await Order.deleteMany({})
  res
    .status(StatusCodes.OK)
    .json({
      message: "All orders successfully deleted",
      order
    })
}

module.exports = {
  getAllService,
  getSingleService,
  updateService,
  deleteService,
  createService,
  deleteAllService
} 