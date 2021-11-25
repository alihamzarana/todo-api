const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// static routes

router.get("/", userController.getAllUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.userLogin);

// dynamic routes

router.get("/:id", userController.getSingleUser);

module.exports = router;
