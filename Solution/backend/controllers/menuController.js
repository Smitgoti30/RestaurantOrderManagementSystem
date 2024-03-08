const Menu = require("../models/Menu");
const dbConnect = require("../database/db");
const cloudinary=require("../utils/cloudinary.js")

const getAllMenu = async (req, res) => {
  try {
    dbConnect();
    const menu = await Menu.find();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const addMenu = async (req, res) => {
  try {
    await dbConnect();
    const menu = await new Menu(req.body).save();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMenuItem = async (req, res) => {
  try {
    let id = req.params.id;
    await dbConnect();
    const menu = await Menu.findById(id);
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    let id = req.params.id;
    let update = req.body;
    await dbConnect();
    let updated = await Menu.findByIdAndUpdate(id, update);
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

const deleteMenuItem = async (req, res) => {
  try {
    let id = req.params.id;
    await dbConnect();
    const deletedItem = await Menu.findByIdAndDelete(id);
    if (deletedItem) {
      res.status(200).json({
        message: `Successfully deleted item with ID ${id}`,
        deletedItem: deletedItem,
      });
    } else {
      res.status(404).json({
        message: `No item found with ID ${id}`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};



 const fileUpload = async (req, res) => {
  const fileBuffer = req.file.buffer;
  console.log(fileBuffer);
  uploadToCloudinary(fileBuffer)
    .then((imageUrl) => {
      res
        .status(200)
        .send({ message: "Image uploaded successfully.", publicurl: imageUrl });
    })
    .catch((error) => {
      throw new Error(error.toString());
    });
};

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          console.error(error);
          reject("Error uploading image to Cloudinary");
        }

        resolve(result.secure_url);
      })
      .end(fileBuffer);
  });
};

module.exports = {
  getAllMenu,
  addMenu,
  updateMenuItem,
  getMenuItem,
  deleteMenuItem,
  fileUpload
};
