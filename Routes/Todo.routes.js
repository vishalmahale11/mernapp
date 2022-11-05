const express = require("express");

const Todo = require("../models/Todo.models");

const app = express();
app.use(express.json());

app.get("/get", async (req, res) => {
  const todo = await Todo.find();
  try {
    res.status(200).send({
      message: "Get All Todos successfully",
      todos: todo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/post", (req, res) => {
  const newTodo = new Todo(req.body);

  newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(201).json({
        message: "Create a new Todo successfuly",
      });
    }
  });
});

app.patch("/patch/:id", async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const todo = await Todo.findByIdAndUpdate(todoId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).json({ message: `No Todo with id: ${todoId}` });
    } else {
      res.status(200).json({
        message: `Todo with id: ${todoId} updated successfully`,
        todo: todo,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const todo = await Todo.findByIdAndDelete(todoId);
    if (!todo) {
      return res.status(404).json({ message: `No todo with id: ${todoId}` });
    } else {
      res.status(200).json({
        message: `Todo with id : ${todoId} deleted successfully`,
        todo: todo,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
