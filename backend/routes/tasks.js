const express = require("express");

const router = express.Router();

const allowedPriorities = ["low", "medium", "high"];

// In-memory task storage
let tasks = [
  {
    id: 1,
    title: "Finish home assignment",
    description: "Complete the full-stack task manager application",
    completed: false,
    createdAt: new Date(),
    priority: "high",
  },
  {
    id: 2,
    title: "Review requirements",
    description: "Make sure all mandatory features are implemented",
    completed: true,
    createdAt: new Date(),
    priority: "medium",
  },
  {
    id: 3,
    title: "Prepare submission",
    description: "Update the README and submit the repository link",
    completed: false,
    createdAt: new Date(),
    priority: "low",
  },
];

let nextTaskId = 4;

// Validate incoming task data
function validateTaskInput(body, isUpdate = false) {
  const errors = [];

  if (!isUpdate || body.title !== undefined) {
    if (typeof body.title !== "string" || body.title.trim() === "") {
      errors.push("Title is required");
    }
  }

  if (!isUpdate || body.description !== undefined) {
    if (
      body.description !== undefined &&
      typeof body.description !== "string"
    ) {
      errors.push("Description must be a string");
    }
  }

  if (!isUpdate || body.priority !== undefined) {
    if (!allowedPriorities.includes(body.priority)) {
      errors.push("Priority must be low, medium, or high");
    }
  }

  if (body.completed !== undefined && typeof body.completed !== "boolean") {
    errors.push("Completed must be a boolean");
  }

  return errors;
}

// Find task by id
function findTask(taskId) {
  return tasks.find((task) => task.id === taskId);
}

// Find task index by id
function findTaskIndex(taskId) {
  return tasks.findIndex((task) => task.id === taskId);
}

// Get all tasks
router.get("/", (req, res) => {
  return res.status(200).json(tasks);
});

// Create a new task
router.post("/", (req, res) => {
  const errors = validateTaskInput(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Invalid task data",
      errors,
    });
  }

  const { title, description, priority } = req.body;

  const newTask = {
    id: nextTaskId++,
    title: title.trim(),
    description: description?.trim() || "",
    completed: false,
    createdAt: new Date(),
    priority,
  };

  tasks.push(newTask);

  return res.status(201).json(newTask);
});

// Update an existing task
router.put("/:id", (req, res) => {
  const taskId = Number(req.params.id);

  if (!Number.isInteger(taskId)) {
    return res.status(400).json({
      message: "Invalid task ID",
    });
  }

  const taskIndex = findTaskIndex(taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const errors = validateTaskInput(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Invalid task data",
      errors,
    });
  }

  const { title, description, priority, completed } = req.body;

  const updatedTask = {
    ...tasks[taskIndex],
    title: title.trim(),
    description: description?.trim() || "",
    completed: completed ?? tasks[taskIndex].completed,
    priority,
  };

  tasks[taskIndex] = updatedTask;

  return res.status(200).json(updatedTask);
});

// Delete a task
router.delete("/:id", (req, res) => {
  const taskId = Number(req.params.id);

  if (!Number.isInteger(taskId)) {
    return res.status(400).json({
      message: "Invalid task ID",
    });
  }

  const taskIndex = findTaskIndex(taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  tasks.splice(taskIndex, 1);

  return res.sendStatus(204);
});

// Toggle task completion status
router.patch("/:id/toggle", (req, res) => {
  const taskId = Number(req.params.id);

  if (!Number.isInteger(taskId)) {
    return res.status(400).json({
      message: "Invalid task ID",
    });
  }

  const task = findTask(taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.completed = !task.completed;

  return res.status(200).json(task);
});

module.exports = router;