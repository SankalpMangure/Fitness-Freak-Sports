const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
// require("dotenv").config();
require('dotenv').config({ path: __dirname + '/config/.env' })

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(`${process.env.DB_HOST_URL}`).then(() => {
    console.log("Connected to MongoDB on host: " + process.env.DB_HOST_URL);
});

app.use("/productCategory", require("./routes/productCategoryRoute"));
app.use("/product", require("./routes/productRoute"));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});