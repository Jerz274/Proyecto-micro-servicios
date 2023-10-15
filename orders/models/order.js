require('dotenv').config()
const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema(
  {
    recipe: {
      type: mongoose.Types.ObjectId,
      ref: 'Recipe',
      required: [true, 'Please provide a recipe.']
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Order', OrderSchema)