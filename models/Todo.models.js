const mongoose = require("mongoose");

const todoModel = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
});

const Todo = mongoose.model("todo", todoModel);

module.exports = Todo;
