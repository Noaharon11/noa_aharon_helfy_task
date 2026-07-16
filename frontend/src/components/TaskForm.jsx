import { useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  priority: "medium",
};

function TaskForm({ editingTask, onCreate, onUpdate, onCancel }) {
  // The edit form is rendered fresh each time (inside a modal), so we can seed
  // the fields straight from the task instead of syncing with an effect.
  const [formData, setFormData] = useState(
    editingTask
      ? {
          title: editingTask.title,
          description: editingTask.description,
          priority: editingTask.priority,
        }
      : emptyForm
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert("Title is required.");
      return;
    }

    if (editingTask) {
      onUpdate({
        ...editingTask,
        ...formData,
      });
    } else {
      onCreate(formData);
    }

    setFormData(emptyForm);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit Task" : "Create New Task"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Task description"
        value={formData.description}
        onChange={handleChange}
      />

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">
        {editingTask ? "Update Task" : "Add Task"}
      </button>

      {editingTask && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;