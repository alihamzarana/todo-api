// /todo_update, todo_create_get, todo_create_post, todo_delete

const todoService = require("../services/TodoService");
const cloudinary = require("../middleware/cloudinary");
// const TODO = require("../model/todos");

// const getAllTodo = (req, res) => {
//   //   let isComplete = req.query.isComplete;
//   //   console.log(req.query);
//   console.log(req.query);

//   // { ...req.query } this is used for query parameter

//   TODO.find({ ...req.query }, (err, todo) => {
//     // console.log(req.query)
//     // console.log(isComplete);
//     // console.log(todo);

//     if (err) {
//       res.json({
//         status: "error",
//         message: err,
//       });
//     } else {
//       if (todo.length == 0) {
//         res.json({
//           // data: todo,
//           status: "error",
//           message: "not todos found!",
//         });
//       } else {
//         res.json({
//           status: "success",
//           message: " todos found !",
//           data: todo,
//         });
//       }
//     }
//   });
// };
const getAllTodo = async (req, res) => {
  let queryPara = req.query;
  // console.log("request query", queryPara);
  // console.log(req.query);

  // { ...req.query } this is used for query parameter
  // {userId: req.query.userId;}

  try {
    const todo = await todoService.getTodos({ ...req.query });
    // console.log("Todos,", todo);
    if (todo) {
      res.json({
        status: "success",
        message: "todos found !",
        data: todo,
      });
    } else {
      res.json({
        // data: todo,
        status: "error",
        message: "not todos found!",
      });
    }
  } catch (err) {
    console.log("errors", err);
    // res.json({
    //    status: "error",
    //  message: "not todos found!",
    // })
  }
};

const getSingleTodo = async (req, res) => {
  const id = req.params.id;
  console.log("single toodo id ", id);
  try {
    const result = await todoService.findTodo({ _id: req.params.id });
    console.log("result", result);

    if (result) {
      res.json({
        status: "success",
        message: "single todo found successfully",
        data: result,
      });
    }
  } catch (err) {
    console.log("errors", err);
    res.json({
      message: "NO  data found",
      status: "error",
    });
  }
};

// const getSingleTodo = (req, res) => {
//   const id = req.params.id;
//   //   console.log(id);

//   TODO.findById(id)
//     .then((result) => {
//       if (result) {
//         res.json({
//           status: "success",
//           message: "single todo found successfully",
//           data: result,
//         });
//       } else {
//         res.json({
//           message: "NO  data found",
//         });
//       }
//     })
//     .catch((error) => console.log(error));
// };

// const postTodo = (req, res) => {
//   const todo = new TODO(req.body);

//   console.log("todos", todo);
//   todo._Id = req.body._id;
//   todo
//     .save()
//     .then((result) => {
//       if (result) {
//         res.json({
//           status: "success",
//           message: "New todo Added successfully",
//           data: result,
//         });
//       } else {
//         res.json({
//           message: "NO  todo added",
//         });
//       }
//     })
//     .catch((error) => console.log(error));
// };

// const postTodo = (req, res) => {
//   const todo = new TODO(req.body);

//   console.log("todos", todo);
//   todo._Id = req.body._id;
//   todo
//     .save()
//     .then((result) => {
//       if (result) {
//         res.json({
//           status: "success",
//           message: "New todo Added successfully",
//           data: result,
//         });
//       } else {
//         res.json({
//           message: "NO  todo added",
//         });
//       }
//     })
//     .catch((error) => console.log(error));
// };
const postTodo = async (req, res) => {
  console.log("image upload", req.file);
  try {
    const uploadImage = req.file?.filename
      ? await cloudinary.uploader.upload(req.file.path)
      : null;
    // console.log("result of file upload", uploadImage);
    let todoData = {
      title: req.body.title,
      isComplete: req.body.isComplete,
      description: req.body.description,
      userId: req.body.userId,
      image: uploadImage?.url,
    };
    console.log("todo controller data", todoData);

    const result = await todoService.createTodo(todoData);

    console.log("result", result);

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
  } catch (err) {
    console.log("errors", err);
  }
};

// const updateTodo = (req, res) => {
//   const id = req.params.id;

//   TODO.findByIdAndUpdate(id, { ...req.body }, { new: true }, (err, todo) => {
//     if (err) {
//       res.json({
//         status: "error",
//         message: err,
//       });
//     } else {
//       res.json({
//         status: "success",
//         message: "updated sucessfully",
//         data: todo,
//       });
//     }
//   });
// };

const updateTodo = async (req, res) => {
  const id = req.params.id;
  console.log(" id for update", id);

  console.log("image update", req.file);
  console.log("body request", req.body);

  const updatedData = {
    title: req.body.title,
    isComplete: req.body.isComplete,
    description: req.body.description,
    userId: req.body.userId,
    image: req.file?.filename ? req.file.filename : null,
  };

  if (updatedData.image == null) {
    delete updatedData.image;
  }

  // if (req.file) {
  //   const image = req.file.filename;
  //   updatedData.image = image;
  // } else {
  //   delete updatedData.image;
  // }

  console.log("updatedData", updatedData);
  try {
    const todo = await todoService.updatedTodo(id, updatedData);

    if (todo) {
      res.json({
        status: "success",
        message: "updated sucessfully",
        data: todo,
      });
    } else {
      res.json({
        status: "error",
        message: "not updated",
      });
    }
  } catch (err) {
    console.log("errors", err);
    // res.json({
    //   status: "error",
    //   message: "not updated",
    // });
  }
};

const deleteTodo = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const todo = await todoService.deletedTodo(id);
    // const todo = await TODO.findByIdAndDelete(id);
    console.log(todo);
    if (todo) {
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
  } catch (err) {
    res.json({
      status: "error",
      message: "todo not exists",
    });
  }
};

// const deleteTodo = (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   TODO.findByIdAndDelete(id).then((result) => {
//     //   console.log(result);
//     if (result) {
//       res.json({
//         status: "success",
//         message: "deleted successfully",
//       });
//     } else {
//       res.json({
//         status: "error",
//         message: "didnot delete",
//       });
//     }
//   });
// };

module.exports = {
  getAllTodo,
  getSingleTodo,
  postTodo,
  updateTodo,
  deleteTodo,
};
