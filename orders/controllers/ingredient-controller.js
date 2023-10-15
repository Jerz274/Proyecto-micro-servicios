const mongoose = require('mongoose')
const { StatusCodes } = require('http-status-codes')
const {
  getAllService,
  getSingleService,
  updateService,
  deleteService,
  createService
} = require('../services/ingredient-service')

const getAllIngredients = async (req, res) => {
  try {
    await getAllService(req, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

const getIngredient = async (req, res) => {
  try {
    const { id: ingredientID } = req.params
    await getSingleService(ingredientID, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

const createIngredient = async (req, res) => {
  try {
    await createService(req.body, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}
const updateIngredient = async (req, res) => {
  try {
    const { id: ingredientID } = req.params
    await updateService(ingredientID, req.body, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

const deleteIngredient = async (req, res) => {
  try {
    const { id: ingredientID } = req.params
    await deleteService(ingredientID, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

module.exports = {
  getAllIngredients,
  getIngredient,
  updateIngredient,
  deleteIngredient,
  createIngredient
}