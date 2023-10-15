const express = require('express')
const router = express.Router()

const {
  getAllIngredients,
  getIngredient,
  updateIngredient,
  deleteIngredient,
  createIngredient
} = require('../controllers/ingredient-controller')


router.route('/').post(createIngredient).get(getAllIngredients)
router.route('/:id').get(getIngredient).patch(updateIngredient).delete(deleteIngredient)

module.exports = router