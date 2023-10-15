const mongoose = require('mongoose')
const Order = require('../models/order')
const { StatusCodes } = require('http-status-codes')
const {
  getAllService,
  getSingleService,
  updateService,
  deleteService,
  createService,
  deleteAllService
} = require('../services/order-service')

const getAllOrders = async (req, res) => {
  try {
    await getAllService(req, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

const getOrder = async (req, res) => {
  try {
    const { id: orderID } = req.params
    await getSingleService(orderID, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

const createOrder = async (req, res) => {
  try {
    await createService(req.body, req, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}
const updateOrder = async (req, res) => {
  try {
    const { id: orderID } = req.params
    await updateService(orderID, req.body, req, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

const deleteOrder = async (req, res) => {
  try {
    const { id: orderID } = req.params
    await deleteService(orderID, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

const deleteAllOrders = async (req, res) => {
  try {
    await deleteAllService(req, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

module.exports = {
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  createOrder,
  deleteAllOrders
}