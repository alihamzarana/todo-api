const express = require("express");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
const cors = require("cors");
const todoRoutes = require("./routes/todoroutes");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 3000;


app.listen(PORT);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("./public"));
app.use(cors());

// app.post('/api/login', (req, res) =>{
//      const user = {
//        _id: 1,
//        userName: "adsd",
//        email: "asd@gmail.com",
//      };
//      jwt.sign({ user }, "secretkey", (err, token) => {
//        res.json({
//          token: token,
//        });
//      });
// })

// todo route

// app.get('/',(req, res) =>{
//     res.send('helllo')
// })
app.use("/todo", todoRoutes);
app.use("/user", userRoutes);

// const dbURI = "mongodb://localhost:27017/node-todoapp"; user:64CNzQ1lWN5BLtiT
const dbURI =
  "mongodb+srv://user:64CNzQ1lWN5BLtiT@node.8jzbu.mongodb.net/node-todoapp?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => console.log(error));
