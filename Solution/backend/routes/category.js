const express = require("express")
const {getAllCategory, addCategory,getCategory,updateCategory} = require("../controllers/categoryController.js")
const category_router = express.Router()

category_router.post("/addCategory", addCategory);
category_router.get("/getAllCategory", getAllCategory);
category_router.get("/getCategory/:id", getCategory)
category_router.put("/updateCategory/:id", updateCategory)

module.exports = category_router