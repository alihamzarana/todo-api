const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../services/UserService");

// const getAllUser = async (req, res) => {
//   User.find({ ...req.query }, (err, user) => {
//     if (err) {
//       res.json({
//         status: "error",
//         message: err,
//       });
//     } else {
//       res.json({
//         status: "success",
//         message: "get all users successfully",
//         data: user,
//       });
//     }
//   });
// };

const getAllUser = async (req, res) => {
  try {
    // console.log("request from users", req.query)

    let user = await userService.getUsers();
    console.log("user", user);
    if (user) {
      res.json({
        status: "success",
        message: "get all users successfully",
        data: user,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: "error",
      message: err,
    });
  }
};

// const registerUser = (req, res) => {

//   //   console.log(req.body);
//   const { email } = req.body;
//   const user = new User(req.body);

//   User.findOne({ email: email }, (err, emailExist) => {
//     if (err) {
//       res.json({
//         status: "error",
//         message: err,
//       });
//     }

//     if (Boolean(emailExist)) {
//       res.json({
//         status: "Error",
//         message: "E-mail already in use",
//       });
//     } else {
//       user.save().then((result) => {
//         if (result) {
//           res.json({
//             status: "sucess",
//             message: "register sucessfully",
//             data: result,
//           });
//         } else {
//           res.json({
//             status: "error",
//             message: "didnot register",
//           });
//         }
//       });
//     }
//   });
// };

const registerUser = async (req, res) => {
  try {
    let userData = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    };
    // const email = req.body.email;
    const checkUser = await userService.findUser({ email: req.body.email });
    console.log("check email", checkUser);
    if (Boolean(checkUser)) {
      res.json({
        status: "error",
        message: "E-Mail already in use",
      });
    } else {
      const addUser = await userService.createUser(userData);

      if (addUser) {
        res.json({
          status: "success",
          message: "user registerd successfully",
          data: addUser,
        });
      }
    }
  } catch (err) {
    console.log("errors", err);
    res.json({
      status: "error",
      message: "user not created",
    });
  }
};

// const getSingleUser = (req, res) => {
//   const id = req.params.id;

//   User.findById(id).then((result) => {
//     if (result) {
//       res.json({
//         status: "sucess",
//         message: "get a user sucessfully",
//         data: result,
//       });
//     } else {
//       res.json({
//         status: "error",
//         message: "not found any user",
//       });
//     }
//   });
// };
const getSingleUser = async (req, res) => {
  const id = req.params.id;
  console.log("id para", id);
  try {
    const user = await userService.findUser({ _id: req.params.id });
    console.log("get single user", user);
    if (user) {
      res.json({
        status: "sucess",
        message: "get a user sucessfully",
        data: user,
      });
    } else {
      res.json({
        status: "error",
        message: "invalid user!",
      });
    }
  } catch (err) {
    res.json({
      status: "error",
      message: "not found any user",
    });
  }
};
// const userLogin = (req, res) => {
//   User.findOne({ email: req.body.email }, (err, userExist) => {
//     console.log("user email", userExist);

//     if (err) {
//       res.json({
//         status: "error",
//         message: err,
//       });
//     }
//     if (Boolean(userExist)) {
//       // const email = req.body.email;
//       const password = req.body.password;
//       console.log("login password", password);

//       bcrypt.compare(password, userExist.password, (err, result) => {
//         if (err) {
//           res.json({
//             status: "error",
//             message: err,
//           });
//         }
//         if (result) {
//           console.log("result", result);
//           const user = {
//             _id: userExist._id,
//           };
//           console.log("user", user);
//           jwt.sign({ user }, "secretkey", (err, token) => {
//             if (err) {
//               res.json({
//                 status: "error",
//                 message: err,
//               });
//             } else {
//               res.json({
//                 token: token,
//                 status: "success",
//                 message: "Login Sucessfully",
//                 data: userExist,
//               });
//             }
//           });
//         } else {
//           res.json({
//             message: "Invalid credentials",
//           });
//         }
//       });
//     } else {
//       res.json({
//         message: "Invalid email",
//       });
//     }
//   });
// };

const userLogin = async (req, res) => {
  try {
    const user = await userService.findUser({ email: req.body.email });
    console.log("user email", user);

    if (Boolean(user)) {
      // const email = req.body.email;
      const password = req.body.password;
      console.log("login password", password);

      const isValid = await bcrypt.compare(password, user.password);

      if (Boolean(isValid)) {
        console.log("result", isValid);
        const payload = {
          _id: user._id,
        };
        console.log("user is valid", user);
   
        const token = await jwt.sign({ payload }, "secretkey");
        if (token) {
          res.json({
            token: token,
            status: "success",
            message: "Login Sucessfully",
            data: user,
          });
        }
        //     else {
        //   res.json({
        //     status: "error",
        //     message: "login failed!",
        //   });
        // }
      } else {
        res.json({
          message: "Invalid credentials",
        });
      }
    } else {
      res.json({
        message: "Invalid email",
      });
    }
  } catch (err) {
    res.json({
      message: err,
      status: "error",
    });
  }
};

module.exports = {
  getAllUser,
  registerUser,
  getSingleUser,
  userLogin,
};
