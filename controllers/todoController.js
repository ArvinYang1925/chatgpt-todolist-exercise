const AppDataSource = require("../config/data-source");
const { v4: uuidv4 } = require("uuid");

const todoRepository = AppDataSource.getRepository("Todo");

// 獲取所有待辦事項
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await todoRepository.find();

    return res.status(200).json({
      status: "success",
      data: todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({
      status: "error",
      message: "伺服器錯誤",
    });
  }
};

// 根據 ID 獲取單一待辦事項
exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await todoRepository.findOne({ where: { id } });

    if (!todo) {
      return res.status(404).json({
        status: "failed",
        message: "找不到該待辦事項",
      });
    }

    return res.status(200).json({
      status: "success",
      data: todo,
    });
  } catch (error) {
    console.error("Error fetching todo:", error);
    return res.status(500).json({
      status: "error",
      message: "伺服器錯誤",
    });
  }
};

// 新增待辦事項
exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        status: "failed",
        message: "欄位未填寫正確",
      });
    }

    const newTodo = {
      id: uuidv4(), // 使用 uuid 生成 ID
      title,
      completed: false,
    };

    const result = await todoRepository.save(newTodo);

    return res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(500).json({
      status: "error",
      message: "伺服器錯誤",
    });
  }
};

// 更新待辦事項
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    if (
      (title !== undefined && title.trim() === "") ||
      (completed !== undefined && typeof completed !== "boolean")
    ) {
      return res.status(400).json({
        status: "failed",
        message: "欄位未填寫正確",
      });
    }

    const todo = await todoRepository.findOne({ where: { id } });

    if (!todo) {
      return res.status(404).json({
        status: "failed",
        message: "找不到該待辦事項",
      });
    }

    // 只更新提供的欄位
    const updatedTodo = {
      ...todo,
      ...(title !== undefined && { title }),
      ...(completed !== undefined && { completed }),
    };

    const result = await todoRepository.save(updatedTodo);

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    return res.status(500).json({
      status: "error",
      message: "伺服器錯誤",
    });
  }
};

// 刪除待辦事項
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await todoRepository.findOne({ where: { id } });

    if (!todo) {
      return res.status(404).json({
        status: "failed",
        message: "找不到該待辦事項",
      });
    }

    await todoRepository.remove(todo);

    return res.status(200).json({
      status: "success",
      data: { message: "待辦事項已成功刪除" },
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).json({
      status: "error",
      message: "伺服器錯誤",
    });
  }
};
