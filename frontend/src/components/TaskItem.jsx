function TaskItem({ task, onEdit, onDelete, onToggle }) {
  const createdDate = new Date(task.createdAt).toLocaleDateString();

  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-card-header">
        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>
        <span className="task-date">{createdDate}</span>
      </div>

      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>

      <div className="task-actions">
        <button className="btn-toggle" onClick={() => onToggle(task.id)}>
          {task.completed ? "Mark Pending" : "Mark Done"}
        </button>
        <button className="btn-edit" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
