const express = require("express");
const product_category = express.Router();

const product_category_controller = require("../controllers/productCategoryController");

product_category.post("/addUpdate", product_category_controller.addUpdate);
// product_category.post("/getByIdOrAll", product_category_controller.getByIdOrAll);
// product_category.get("/getByIdOrAll/:id", product_category_controller.getByIdOrAll);
product_category.get("/getByIdOrAll", product_category_controller.getByIdOrAll);
product_category.delete("/deleteCat/:id", product_category_controller.deleteCat);

module.exports = product_category;