import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "../services/taskService";

import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // Apply the theme to the page and remember the choice for next time.
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Load tasks once when the app mounts.
  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  async function handleCreateTask(task) {
    try {
      const createdTask = await createTask(task);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdateTask(task) {
    try {
      const updatedTask = await updateTask(task.id, task);

      setTasks((prevTasks) =>
        prevTasks.map((currentTask) =>
          currentTask.id === updatedTask.id ? updatedTask : currentTask
        )
      );

      setEditingTask(null);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteTask(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTask(id);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggleTask(id) {
    try {
      const updatedTask = await toggleTask(id);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <main className="app">
      <button
        className="theme-toggle"
        aria-label="Toggle dark mode"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <h1>Task Manager Dashboard</h1>

      {error && <p className="error-banner">{error}</p>}

      <TaskForm onCreate={handleCreateTask} />

      <TaskFilter
        filter={filter}
        onFilterChange={setFilter}
      />

      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : (
        <TaskList
          // Reset the carousel when the visible list changes.
          key={`${filter}-${filteredTasks.length}`}
          tasks={filteredTasks}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTask}
        />
      )}

      {editingTask && (
        <Modal onClose={() => setEditingTask(null)}>
          <TaskForm
            editingTask={editingTask}
            onUpdate={handleUpdateTask}
            onCancel={() => setEditingTask(null)}
          />
        </Modal>
      )}
    </main>
  );
}

export default App;