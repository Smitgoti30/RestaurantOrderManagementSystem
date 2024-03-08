const dbConnect = require("../database/db");
const Category = require("../models/Category");

const addCategory = async (req, res) => {
  console.log(req.body);
  try {
    await dbConnect();
    const category = await new Category(req.body).save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const getCategory = async (req, res) => {
  try {
    let id = req.params.id;
    await dbConnect();
    const category = await Category.findByIdAndUpdate(id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } 
};
const updateCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let update = req.body;
    await dbConnect();
    let updated = await Category.findByIdAndUpdate(id, update);
    if (updated) {
      res
        .status(200)
        .json({ meassage: `Succesfully updated order with id ${id}` });
    } else {
      res.status(404).json({ meassage: `No order found with id ${id}` });
    }
  } catch (e) {
    throw new Error(e);
  }
};

const getAllCategory = async (req, res) => {
  try {
    dbConnect();
    const category = await Category.find();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }

};

module.exports = { getAllCategory, addCategory, getCategory, updateCategory };
