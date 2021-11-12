// /todo_update, todo_create_get, todo_create_post, todo_delete
const TODO = require("../model/todos");

const getAllTodo = (req, res) => {
  //   let isComplete = req.query.isComplete;
  //   console.log(req.query);
  console.log(req.query)

  // { ...req.query } this is used for query parameter

  TODO.find({ ...req.query }, (err, todo) => {
    // console.log(req.query)
    // console.log(isComplete);
    // console.log(todo);

    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      if (todo.length==0) {
        res.json({
          // data: todo,
          status: "error",
          message: "not todos found!",
        });
      } else {
        res.json({
          status: "success",
          message: " todos found !",
          data: todo,
        });
      }
    }
  });
};

const getSingleTodo = (req, res) => {
  const id = req.params.id;
  //   console.log(id);

  TODO.findById(id)
    .then((result) => {
      if (result) {
        res.json({
          status: "success",
          message: "single todo found successfully",
          data: result,
        });
      } else {
        res.json({
          message: "NO  data found",
        });
      }
    })
    .catch((error) => console.log(error));
};

const postTodo = (req, res) => {
  const todo = new TODO(req.body);
  
  console.log('todos', todo)
  todo._Id = req.body._id;
  todo
    .save()
    .then((result) => {
      if (result) {
        res.json({
          status: "success",
          message: "New todo Added successfully",
          data: result,
        });
      } else {
        res.json({
          message: "NO  todo added",
        });
      }
    })
    .catch((error) => console.log(error));
};

const updateTodo = (req, res) => {
  const id = req.params.id;

  TODO.findByIdAndUpdate(id, { ...req.body },{new: true}, (err, todo) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
       else {
        res.json({
          status: "success",
          message: "updated sucessfully",
          data: todo
          
        });
      }
   
  });
};

const deleteTodo = (req, res) => {
  const id = req.params.id;
  console.log(id);
  TODO.findByIdAndDelete(id).then((result) => {
    //   console.log(result);
    if (result) {
      res.json({
        status: "success",
        message: "deleted successfully",
      });
    } else {
      res.json({
        status: "error",
        message: "didnot delete",
      });
    }
  });
};

module.exports = {
  getAllTodo,
  getSingleTodo,
  postTodo,
  updateTodo,
  deleteTodo,
};
