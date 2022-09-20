const fs = require("fs");
const product_model = require("../models/productModel");

addUpdate = async (req, res) => {
    let body = req.body.data;
    try {
        let data = new product_model();
        if (body.id) {
            data = await product_model.findById(body.id);
        }

        data.pcid = body.pcid;
        data.name = body.name;
        data.description = body.description;
        data.specification = body.specification;
        data.mrp = body.mrp;
        data.price = body.price;
        data.varieties = [];
        data.instock = body.instock;
        data.isactive = body.isactive;
        // data.imagePath = body.imagePath;

        const result = await data.save();

        if (result) {
            let imagePath = body.imagePath;
            if (imagePath != "") {
                // let randomname = result.id;
                let randomname = (Math.random() + 1).toString(36).substring(7);
                imagePath = imagePath.replace(/^data:image\/png;base64,/, "");
                data.imagePath = "products/" + randomname + ".png";
                fs.writeFile("assets/" + data.imagePath, imagePath, 'base64', function (err) {
                    if (err) {
                        console.log("problem during saving image");
                    }
                });
                data = await product_model.findByIdAndUpdate({ _id: result.id }, { imagePath: data.imagePath });
                await data.save();
            }
            res.json({ success: true, msg: "Product add/update successfully", response_data: result })
        } else {
            res.json({ success: false, msg: "Something Went Wrong" })
        }

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, msg: error, response_data: error.errors });
    }
}

getByIdOrAll = async (req, res) => {
    let body = req.query;
    // let body = req.params;
    try {
        let result = "";
        if (body.id) {
            result = await product_model.findById(body.id);
        } else {
            result = await product_model.find();
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

deleteProduct = async (req, res) => {
    let body = req.params;
    try {
        if (body.id) {
            let result = await product_model.findByIdAndDelete(body.id);
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

getProductByCategory = async (req, res) => {
    let body = req.body.data;
    try {
        if (body.categoryId != "") {
            // let data = new produst_model();
            // console.log(data);
            let result = await product_model.find({ pcid: body.categoryId })
            if (result) {
                res.json({ success: true, response_data: result });
            } else {
                res.json({ success: false, response_data: result });
            }
        } else {
            res.json({ success: false, msg: "category id is required" })
        }
    } catch (error) {
        res.json({ success: false, msg: error })
    }
}

addVariety = async (req, res) => {
    let body = req.body.data;
    try {
        if (body.productId != "") {
            let result = await product_model.findById(body.productId);
            if (result) {
                result.varieties.push(body.variety);
                let finalresult = await result.save();
                if (finalresult) {
                    res.json({ success: true, response_data: result.varieties.length });
                } else {
                    res.json({ success: false, msg: "problem during update new object" });
                }
            } else {
                res.json({ success: false, msg: "product not found for this id" });
            }
        } else {
            res.json({ success: false, msg: "product id is required" })
        }
    } catch (error) {
        res.json({ success: false, msg: error })
    }
}

// daleteVariety = async (req, res) => {
//     let body = req.body.data;
//     try {
//         if (body.productId != "") {
//             let result = await product_model.findById(body.productId);
//             if (result) {
//                 // code here
//             } else {
//                 res.json({ success: false, msg: "product not found for this id" });
//             }
//         } else {
//             res.json({ success: false, msg: "product id is required" })
//         }
//     } catch (error) {
//         res.json({ success: false, msg: error })
//     }
// }

module.exports = {
    addUpdate,
    getByIdOrAll,
    deleteProduct,
    getProductByCategory,
    addVariety
}


