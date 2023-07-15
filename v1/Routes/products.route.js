const express = require('express');
const productController = require("../Controllers/products.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();


// publish a post
router.post("/", productController.publishAPost);

// get all posts
router.get("/", productController.getAllproducts);

// get single post
router.get("/:id", productController.getSinglePost);

// delete a post
router.delete("/:id", productController.deleteAPost);

// approve a post
router.put("/:id", productController.approveAPost);



module.exports = router;