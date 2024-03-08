require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT;

const menu_router = require('./routes/menu')
const category_router = require('./routes/category')

app.use(cors());
app.use(express.json());
  app.use("/",menu_router)
  app.use("/",category_router)

  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


