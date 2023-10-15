const mongoose = require('mongoose')
const { StatusCodes } = require('http-status-codes')
const {
  getAllService,
  getSingleService,
  updateService,
  deleteService,
  createService
} = require('../services/recipe-service')

const getAllRecipes = async (req, res) => {
  try {
    await getAllService(req, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

const getRecipe = async (req, res) => {
  try {
    const { id: recipeID } = req.params
    await getSingleService(recipeID, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

const createRecipe = async (req, res) => {
  try {
    await createService(req.body, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}
const updateRecipe = async (req, res) => {
  try {
    const { id: recipeID } = req.params
    await updateService(recipeID, req.body, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

const deleteRecipe = async (req, res) => {
  try {
    const { id: recipeID } = req.params
    await deleteService(recipeID, res)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error)
  }
}

module.exports = {
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  createRecipe
}