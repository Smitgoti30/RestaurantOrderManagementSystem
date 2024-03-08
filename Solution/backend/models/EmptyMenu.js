const mongoose = require("mongoose");

const emptymenuSchema = new mongoose.Schema({
  category_name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, default: true },
  items: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Menu", emptymenuSchema);
