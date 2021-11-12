const express = require('express')
const router = express.Router()
const todoContrller = require('../controller/todoController')

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("token is here",token)
  console.log("header request",req.headers)
  const decodedToken = jwt.verify(token, "secretkey");
  console.log("decodeToken", decodedToken);
  const userId = decodedToken.user._id;
  console.log("userId", userId);
  if (req.body.userId && req.body.userId !== userId) {
    res.json({
      message: " invalid user",
    });
  } else {
    next();
  }
};
// static routes
router.get('/', verifyToken, todoContrller.getAllTodo) 
router.post("/", verifyToken,todoContrller.postTodo);

//  dynamic 
router.get('/:id', todoContrller.getSingleTodo)
router.put('/:id', verifyToken, todoContrller.updateTodo)
router.delete('/:id', todoContrller.deleteTodo)

module.exports = router
  
  