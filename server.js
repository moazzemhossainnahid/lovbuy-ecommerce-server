const dbConnect = require("./Utilities/dbConnect");

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const colors = require("colors");
const mongoose = require('mongoose');
require('dotenv').config();

// connect db
dbConnect();


app.use(cors());
app.use(express.json());



// import routes
const usersRoute = require('./v1/Routes/users.route');
const productsRoute = require('./v1/Routes/products.route');





// declare routes
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/products', productsRoute);



app.get("/", (req, res) => {
    try {
        res.send("Welcome to LovBuy e-Commerce Server !");
    } catch (error) {
        console.log(error.message);
    };
});

app.all("*", (req, res) => {
    try {
        res.send("No Routes Found");
    } catch (error) {
        console.log(error.message);
    };
});


app.listen(PORT, () => {
    try {
        console.log(`server is successfully running on port ${PORT}!`.red.bold);
    } catch (error) {
        console.log(error.message);
    };
});

exports = app;