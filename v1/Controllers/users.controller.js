const express = require("express");
const Users = require('../Models/users.model');
const jwt = require("jsonwebtoken");
require('dotenv').config();

// post user by email
exports.postAnUser = async (req, res) => {
    try {
        const email = req.params.email;
        const user = req.body;
        console.log(user);
        const filter = { email: email };
        const options = { upsert: true };
        const updateDoc = {
            $set: user
        };
        const result = await Users.updateOne(filter, updateDoc, options);
        const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        // res.send({ result, accessToken: token });
        // console.log(token);
        res.status(200).json({
            status: "success",
            message: "Successfully logged in",
            data: {
                user: result,
                accessToken: token,
            },
        });
    } catch (err) {
        res.status(404).json(err);
    }
}


// get an user
exports.getAnUser = async (req, res) => {
    try {
        const email = req.params.email;
        const query = { email: email }
        const user = await Users.findOne(query);
        return res.status(200).json(user);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

// get all users
exports.getAllUsers = async (req, res) => {
    const query = {};
    const users = await Users.find(query);
    res.send(users)
}


// delete an user
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const query = { _id: id };
        console.log(query);
        const result = await Users.deleteOne(query);
        res.send(result)
    } catch (err) {
        res.status(404).json(err);
    }
}


// make admin by email
exports.makeAdmin = async (req, res) => {
    try {
        const email = req.params.email;
        const filter = { email: email };
        const options = { upsert: true };
        const updateDoc = {
            $set: { role: 'admin' }
        };
        const result = await Users.updateOne(filter, updateDoc, options);
        res.send(result);
    } catch (err) {
        res.status(404).json(err);
    }
}


//get admin api 
exports.getAdmin = async (req, res) => {
    try {
        const email = req.params.email;
        const query = { email: email }
        const adminUser = await Users.findOne(query);
        // console.log(adminUser);
        const isAdmin = adminUser.role === "admin";
        const isSPAdmin = adminUser.role === "superadmin"
        res.send({ role: isAdmin || isSPAdmin })
    } catch (err) {
        res.status(404).json(err);
    }
}


// remove admin by email
exports.removeAdmin = async (req, res) => {
    try {
        const email = req.params.email;
        const filter = { email: email };
        const options = { upsert: true };
        const updateDoc = {
            $set: { role: 'user' }
        };
        const result = await Users.updateOne(filter, updateDoc, options);
        res.send(result);
    } catch (err) {
        res.status(404).json(err);
    }
}


