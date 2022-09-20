const isset = require('isset-php');
const fs = require("fs");
const Product_category_model = require("../models/productCategoryModel");

addUpdate = async (req, res) => {
    let body = req.body.data;
    try {
        let product_category = new Product_category_model();
        // if (body.id != "") {
        if (isset(() => body.id) && body.id != "") {
            product_category = await Product_category_model.findById(body.id);
        }
        product_category.name = body.name;
        product_category.srno = body.srno;
        // product_category.imgPath = body.imgPath;

        const result = await product_category.save();
        if (result) {
            let base64image = body.imgPath;
            if (base64image != "") {
                // let randomname = result.id;
                let randomname = (Math.random() + 1).toString(36).substring(7);
                base64image = base64image.replace(/^data:image\/png;base64,/, "");
                product_category.imgPath = "productcategories/" + randomname + ".png";
                fs.writeFile("assets/" + product_category.imgPath, base64image, 'base64', function (err) {
                    if (err) {
                        console.log("problem during saving image");
                    }
                })
                product_category = await Product_category_model.findByIdAndUpdate({ _id: result.id }, { imgPath: product_category.imgPath });
                await product_category.save();
            }
            res.json({ success: true, msg: "Product category add/update successfully", response_data: result })
        } else {
            res.json({ success: false, msg: "Something Went Wrong" })
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, msg: error, response_data: error.errors })
    }
}

getByIdOrAll = async (req, res) => {
    // let body = req.body.data; //POST //http://localhost:8081/productCategory/getByIdOrAll
    // let body = req.params; //GET //http://localhost:8081/productCategory/getByIdOrAll/62e2744cdb63ee4047bd4cd7
    let body = req.query; //GET //http://localhost:8081/productCategory/getByIdOrAll?id=62e2744cdb63ee4047bd4cd7
    console.log(body);
    try {
        let result = new Product_category_model();
        if (body.id) {
            result = await Product_category_model.findById(body.id);
        } else {
            result = await Product_category_model.find();
        }
        if (result) {
            res.json({ success: true, response_data: result });
        } else {
            res.json({ success: false, response_data: result });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: error, response_data: error.errors })
    }
}

deleteCat = async (req, res) => {
    let body = req.params;
    // console.log(body);
    try {
        let result = new Product_category_model();
        if (body.id) {
            result = await Product_category_model.findByIdAndDelete(body.id);
            // console.log(result);
            if (result) {
                res.json({ success: true, msg: "record deleted successfully" })
            } else {
                res.json({ success: false, msg: "something went wrong during delete" })
            }
        } else {
            res.json({ success: false, msg: "Id is required to delete" });
        }
    } catch (error) {
        res.json({ success: false, msg: error })
    }
}
// module.exports = {
// addUpdate: async (req, res) => {
// PLEASE WRITE UR LOGIC HERE
// }
// };

module.exports = {
    addUpdate,
    getByIdOrAll,
    deleteCat
}