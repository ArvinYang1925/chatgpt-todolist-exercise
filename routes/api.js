const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// Todo 相關路由
router.get("/todos", todoController.getAllTodos);
router.get("/todos/:id", todoController.getTodoById);
router.post("/todos", todoController.createTodo);
router.put("/todos/:id", todoController.updateTodo);
router.delete("/todos/:id", todoController.deleteTodo);

router.get("/welcome", (req, res) => {
  res.send("Welcome to Todo List API!");
});

module.exports = router;
