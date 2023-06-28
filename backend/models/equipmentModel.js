const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//each equipment needs to have a name, description and price
const equipmentSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
    geocode: {
      type: [Number],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Equipment', equipmentSchema);
