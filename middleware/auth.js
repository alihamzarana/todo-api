
const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
  //get auth header value
  const bearerHeader = req.headers["authorization"];

  // check if bearer is undefined

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    // get token from string

    const bearToken = bearer[1];
    req.token = bearToken;

    next();
  } else {
    res.status(403).json({
      message: " user not authneticated",
    });
  }
};

exports.module = {verifyToken}
