import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category_name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, default: true },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
