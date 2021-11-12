const mongoose = require('mongoose')


const Schema  = mongoose.Schema

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
    },

    description: {
      type: String,
      required: false,
    },
  
  },
  { timestamps: true }
);

const TODO = mongoose.model('TODO', todoSchema)

module.exports = TODO