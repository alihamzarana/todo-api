const express = require("express");
const router = express.Router();
const todoContrller = require("../controller/todoController");
const auth = require("../middleware/auth");
// const multer = require("../middleware/multer");

// static routes
router.get("/", todoContrller.getAllTodo);
router.post("/", auth.upload, todoContrller.postTodo);
//  dynamic
router.get("/:id", todoContrller.getSingleTodo);
router.put("/:id", auth.upload, todoContrller.updateTodo);
router.delete("/:id", todoContrller.deleteTodo);

module.exports = router;

// [auth.upload, auth.verifyToken];
