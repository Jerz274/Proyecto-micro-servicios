require('dotenv').config()
const mongoose = require('mongoose')

const IngredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minLength: 1,
      maxLength: 50,
      unique: [true, 'Ingredient already exists']
    }
  }, { timestamps: true }
)
module.exports = mongoose.model('Ingredient', IngredientSchema)