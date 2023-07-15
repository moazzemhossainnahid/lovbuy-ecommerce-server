const express = require('express');
const productController = require("../Controllers/products.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();


// publish a post
router.post("/", productController.publishAProduct);

// get all posts
router.get("/", productController.getAllproducts);

// get single post
router.get("/:id", productController.getSingleProduct);

// delete a post
router.delete("/:id", productController.deleteAProduct);

// approve a post
router.put("/:id", productController.approveAProduct);



module.exports = router;