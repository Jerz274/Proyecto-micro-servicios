const express = require('express')
const router = express.Router()

const {
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  createRecipe
} = require('../controllers/recipe-controller')


router.route('/').post(createRecipe).get(getAllRecipes)
router.route('/:id').get(getRecipe).patch(updateRecipe).delete(deleteRecipe)

module.exports = router