const express = require("express");
const {
  getAllMenu,
  addMenu,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
  fileUpload
} = require("../controllers/menuController.js");
const path = require("path");
const multer = require("multer")

const menu_router = express.Router();

const storage = multer.memoryStorage({});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("File type must be jpeg, jpg ,png ");
  },
});

menu_router.get("/getAllMenu", getAllMenu);
menu_router.post("/addMenu", addMenu);
menu_router.get("/getMenuItem/:id", getMenuItem);
menu_router.put("/updateMenuItem/:id", updateMenuItem);
menu_router.delete("/deleteMenuItem/:id", deleteMenuItem);
menu_router.post("/addMenu/fileupload", upload.single("file"), fileUpload);


module.exports = menu_router;
