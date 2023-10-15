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
    },
    quantities: {
      type: Number,
      default: 3
    }
  }, { timestamps: true }
)
module.exports = mongoose.model('Ingredient', IngredientSchema)