const filters = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

function TaskFilter({ filter, onFilterChange }) {
  return (
    <div className="task-filter">
      {filters.map((item) => (
        <button
          key={item.value}
          className={filter === item.value ? "active" : ""}
          onClick={() => onFilterChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
