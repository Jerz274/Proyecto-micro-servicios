require('dotenv').config()
const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minLength: 1,
      maxLength: 50,
      unique: [true, 'Recipe with that name already exists']
    },
    ingredients: [
      { type: mongoose.Types.ObjectId, ref: 'Ingredient' }
    ]
  }, {
  timestamps: true
}
)
module.exports = mongoose.model('Recipe', RecipeSchema)