const express = require("express");
const Products = require('../Models/products.model');
require('dotenv').config();



// publish a product
exports.publishAPost = async (req, res) => {
    try {
        const product = req.body;
        // console.log(req.file);
        // console.log(req.body);
        const products = await Products.create(product);
        res.status(200).json({
            status: "Successful",
            message: "Data added Successfully",
            data: products
        });
    } catch (error) {
        res.json(error);
    }
}


// get single post
exports.getSinglePost = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: id }
        const post = await Products.findOne(query);
        return res.status(200).json(post);
    } catch (err) {
        res.status(404).json(err.message);
    }
}


// get all posts
exports.getAllproducts = async (req, res) => {
    const query = {};
    const products = await Products.find(query);
    res.send(products)
}


// delete a pst
exports.deleteAPost = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        const query = { _id: id };
        // console.log(query);
        const result = await Products.deleteOne(query);
        res.send(result)
    } catch (err) {
        res.status(404).json(err);
    }
}


// approve a post
exports.approveAPost = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const filter = { _id: id };
        const options = { upsert: true };
        const updateDoc = {
            $set: { status: 'approve' }
        };
        const result = await Products.updateOne(filter, updateDoc, options);
        res.send(result);
    } catch (err) {
        res.status(404).json(err);
    }
}

