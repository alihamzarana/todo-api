const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");

const getAllUser = (req, res) => {
  User.find({ ...req.query }, (err, user) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      res.json({
        status: "success",
        message: "get all users successfully",
        data: user,
      });
    }
  });
};

const registerUser = (req, res) => {
  //   console.log(req.body);
  const { email } = req.body;
  const user = new User(req.body);

  User.findOne({ email: email }, (err, emailExist) => {
    if (err) {
      res.json({
        status: "success",
        message: err,
      });
    }

    if (Boolean(emailExist)) {
      res.json({
        status: "Error",
        message: "E-mail already in use",
      });
    } else {
      user.save().then((result) => {
        if (result) {
          res.json({
            status: "sucess",
            message: "register sucessfully",
            data: result,
          });
        } else {
          res.json({
            status: "error",
            message: "didnot register",
          });
        }
      });
    }
  });
};

const getSingleUser = (req, res) => {
  const id = req.params.id;

  User.findById(id).then((result) => {
    if (result) {
      res.json({
        status: "sucess",
        message: "get a user sucessfully",
        data: result,
      });
    } else {
      res.json({
        status: "error",
        message: "not found any user",
      });
    }
  });
};

const userLogin = (req, res) => {
  //      User.findOne({ email: req.body.email }, function (err, user) {
  //     if (err) return res.status(500).send('Error on the server.');
  //     if (!user) return res.status(404).send('No user found.');

  //     var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  //     if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

  //     var token = jwt.sign({ id: user._id }, app.secret, {
  //       expiresIn: 86400 // expires in 24 hours
  //     });

  //     res.status(200).send({ auth: true, token: token });
  //   });

  User.findOne({ ...req.body }, (err, userExist) => {
    // console.log("login user", userExist);
    // let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    if (Boolean(userExist)) {
      // const user = {
      //   _id: req.body._id,

      //   email: req.body.email,
      //   password: req.body.userName,
      // };
      // console.log("user", user);y
      // jwt.sign({ user }, "secretkey", (err, token) => {
      //   res.json({
      //     token: token,
      //     status: "success",
      //     message: "Login Sucessfully",
      //     data: userExist,
      //   });
      // });
      const user = {
        _id: userExist._id,
      };
      console.log("user", user);
      jwt.sign({ user }, "secretkey", (err, token) => {
        if (err) {
          res.json({
            status: "error",
            message: err,
          });
        } else {
          res.json({
            token: token,
            status: "success",
            message: "Login Sucessfully",
            data: userExist,
          });
        }
      });
    }
      // res.json({
      //   status: "success",
      //   message: "Login Sucessfully",
      //   data: userExist,
      // });
    // }
     else {
      res.json({
        status: "error",
        message: "INVALID! email or password!",
      });
    }
  });
  // .then((result) => {
  //   if (result) {
  //     res.json({
  //       status: "success",
  //       message: "login successfully",
  //       data: result,
  //     });
  //   } else {
  //     res.json({
  //       message: "NO  data found",
  //     });
  //   }
  // });

  //   console.log(user)
};

module.exports = {
  getAllUser,
  registerUser,
  getSingleUser,
  userLogin,
};
