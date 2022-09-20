const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    srno: {
        type: String,
        required: true
    },
    imgPath: {
        type: String,
    }
});

module.exports = mongoose.model("productcategory", productCategorySchema)