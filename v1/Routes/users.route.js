const express = require('express');
const userController = require("../Controllers/users.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();

// post an user
router.put("/:email", userController.postAnUser);

// get an User
router.get("/:email", userController.getAnUser);

// get all Users
router.get("/", userController.getAllUsers);

// delete an User
router.delete("/:id", userController.deleteUser);

// get an Admin
router.get("/isAdmin/:email", userController.getAdmin);

// make an Admin
router.put("/admin/:email", userController.makeAdmin);

// remove an Admin
router.put("/admin/remove/:email", userController.removeAdmin);


module.exports = router;