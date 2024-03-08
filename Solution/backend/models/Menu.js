const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      category_name:{type: String, required: true }
});

module.exports = mongoose.model("Menu", menuSchema);
