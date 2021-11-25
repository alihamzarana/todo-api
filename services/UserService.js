const User = require("../model/user");

const getUsers = async () => {
  let user = await User.find().populate("userTodos");
  return user;
};

const createUser = async (userData) => {
  console.log("user data", userData);
  const user = await new User(userData);
  const data = await user.save();

  return data;
};

const findUser = async (value) => {
  console.log("user", value);
  // const email = user.email;
  // console.log("email is find one", email);
  const checkUser = await User.findOne(value);
  console.log("checkUser", checkUser);
  return checkUser;
};



module.exports = {
  getUsers,
  createUser,
  findUser,
  
};
