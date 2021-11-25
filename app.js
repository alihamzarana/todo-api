const express = require("express");

const mongoose = require("mongoose");
// const dotenv = require("dotenv");
require("dotenv").config();

// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

const app = express();
const cors = require("cors");
const todoRoutes = require("./routes/todoroutes");
const userRoutes = require("./routes/userRoutes");

// dotenv.config();

// const port = process.env.PORT || 3000;

console.log("port env", process.env.PORT);

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("./public"));
app.use(cors());

app.use("/todo", todoRoutes);
app.use("/user", userRoutes);

// // const dbURI = "mongodb://localhost:27017/node-todoapp"; user:64CNzQ1lWN5BLtiT
// const DB_URI =
//   "mongodb+srv://user:64CNzQ1lWN5BLtiT@node.8jzbu.mongodb.net/node-todoapp?retryWrites=true&w=majority";

app.listen(process.env.PORT || 3000);
console.log("DB_URI envvvv", process.env.DB_URI);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => console.log("db error", error));
