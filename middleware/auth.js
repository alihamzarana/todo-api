const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("token is here", token);
  console.log("header request", req.headers);
  const decodedToken = jwt.verify(token, "secretkey");
  console.log("decodeToken", decodedToken);
  const userId = decodedToken.payload._id;
  console.log("userId", userId);

  console.log("req.body.userId", req.body.userId);
  if (req.body.userId !== userId) {
    res.json({
      message: "invalid user",
    });
  } else {
    next();
  }
};

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldnamec + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("image");

module.exports = { verifyToken, upload };
