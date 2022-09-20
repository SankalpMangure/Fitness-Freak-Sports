const express = require("express");
const product = express.Router();

const product_controller = require("../controllers/productController");



product.post("/addUpdate", product_controller.addUpdate);
product.get("/getByIdOrAll/:id", product_controller.getByIdOrAll);
product.delete("/deleteProduct/:id", product_controller.deleteProduct);
product.post("/getProductByCategory", product_controller.getProductByCategory)
product.post("/addVariety", product_controller.addVariety)

module.exports = product;