const Todo = require("../models/Todo");
const { todoSchema } = require("../utils/todoValidation");

const createTodo = async (req, res) => {
  const { error } = todoSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  try {
    const todo = new Todo({ ...req.body, user: req.user });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const updateTodo = async (req, res) => {
  const { error } = todoSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ msg: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });
    if (!todo) return res.status(404).json({ msg: "Todo not found" });
    res.json({ msg: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
