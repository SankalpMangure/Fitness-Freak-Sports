const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    pcid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    specification: {
        type: String,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    varieties: [],
    instock: {
        type: String,
        required: true
    },
    isactive: {
        type: String,
        required: true
    },
    imagePath: {
        type: String
        // required: true
    }
});

module.exports = mongoose.model("product", productSchema);