const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
// const verifyToken = require("../middleware/auth")
const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secretkey");
    console.log("decodeToken", decodedToken);
    const userId = decodedToken.user._id;
    console.log("userId", userId)
    if (req.body.userId && req.body.userId !== userId) {
      res.json({
          message:" invalid user"
      })
    } else {
      next();
    }

};

// const verifyToken = (req, res, next) => {
//     //get auth header value
//     const bearerHeader = req.headers['authorization']

//     // check if bearer is undefined


//     if(typeof bearerHeader !== 'undefined'){
//         const bearer = bearerHeader.split(' ')
//         // get token from string

//         const bearToken =bearer[1]
//         req.token = bearToken

//         next() 
//     }else {
//         res.status(403).json({
//             message:" user not authneticated",
//         })
//     }
// };

// static routes

router.get('/',  userController.getAllUser)
router.post("/register", userController.registerUser);
router.post('/login', userController.userLogin)




// dynamic routes

router.get('/:id', userController.getSingleUser)

module.exports = router;

