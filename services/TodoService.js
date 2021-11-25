const Todo = require("../model/todos");
const User = require("../model/user");
const moment = require("moment");

const getTodos = async (queryPara) => {
  console.log("queryPara ", queryPara);

  let queryObj = {};
  // console.log(" queryObj is", queryObj);

  if (queryPara.id) {
    queryObj = { ...queryObj, _id: queryPara.id };
    console.log("todo id", queryObj);
  }
  if (queryPara.userId) {
    queryObj = { ...queryObj, userId: queryPara.userId };
    console.log("user id and date", queryObj);
  }
  if (queryPara.date) {
    console.log("date is", queryPara.date);
    const today = moment(queryPara.date).startOf("day");

    console.log("date is", today);

    queryObj = {
      ...queryObj,
      createdAt: {
        $gt: today.toDate(),
        $lt: moment(today).endOf("day").toDate(),
      },
    };
    console.log("date obj", queryObj);
  }

  if (queryPara.startTime && queryPara.endTime) {
    let startDate = moment(queryPara.startTime);
    let endDate = moment(queryPara.endTime);
    // console.log("end date", endDate);

    queryObj = { ...queryObj, createdAt: { $gt: startDate, $lt: endDate } };
    console.log("queryObj", queryObj);
  }
  const result = await Todo.find(queryObj);
  // console.log("result", result);
  return result;
};

const findTodo = async (todo) => {
  console.log("todo", todo);

  const checktodo = await Todo.findOne(todo).populate("userId");
  console.log("checktodo", checktodo);
  return checktodo;
};

const createTodo = async (todoData) => {
  //   console.log("todo data", todoData);
  const todo = await new Todo(todoData);
  //   console.log("save data", todo);
  const data = await todo.save();
  console.log("create todo", data);
  saveUserTodo(data._id, data.userId);

  return data;
};
const saveUserTodo = async (todoId, userId) => {
  // console.log("save user todo", todoId);
  // console.log("usrID from save user todo", userId);

  const data = await User.updateOne(
    { _id: userId },
    { $push: { userTodos: todoId } }
  );
  // console.log("save user todo data", data);
  return data;
};
const updatedTodo = async (id, args) => {
  console.log("id", id);
  console.log("arguments", args);
  const todo = await Todo.findByIdAndUpdate(id, { ...args }, { new: true });
  console.log("todo", todo);
  return todo;
};

const deletedTodo = async (id) => {
  console.log("deleted id", id);

  const todo = await Todo.findByIdAndDelete(id);
  console.log("deleted todo", todo);
  removeUserTodo(todo.userId, todo._id);
  return todo;
};

const removeUserTodo = async (userId, todoId) => {
  const data = await User.updateOne(
    { _id: userId },
    { $pull: { userTodos: todoId } }
  );
  return data;
};
module.exports = {
  getTodos,
  findTodo,
  createTodo,
  updatedTodo,
  deletedTodo,
  saveUserTodo,
};
