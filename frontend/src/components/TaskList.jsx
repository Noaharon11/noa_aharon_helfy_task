import { useRef, useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  // Clone the last task to the front and the first task to the end. The track
  // can then slide one step past an edge and jump back (with no animation) to
  // the matching real slide, which is what makes the loop look endless.
  const slides =
    tasks.length > 0
      ? [tasks[tasks.length - 1], ...tasks, tasks[0]]
      : [];

  const [index, setIndex] = useState(1);
  const [animate, setAnimate] = useState(true);
  const isSliding = useRef(false);

  // Block new moves while one is animating so fast clicks can't overshoot.
  function goNext() {
    if (isSliding.current) return;
    isSliding.current = true;
    setAnimate(true);
    setIndex((prev) => prev + 1);
  }

  function goPrevious() {
    if (isSliding.current) return;
    isSliding.current = true;
    setAnimate(true);
    setIndex((prev) => prev - 1);
  }

  // When a slide lands on a clone, snap back to the matching real slide.
  function handleTransitionEnd(event) {
    // Only react to the track's own transition, not button transitions bubbling up.
    if (event.target !== event.currentTarget) return;

    if (index === slides.length - 1) {
      setAnimate(false);
      setIndex(1);
    } else if (index === 0) {
      setAnimate(false);
      setIndex(tasks.length);
    }

    isSliding.current = false;
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks yet</h3>
        <p>Create your first task to get started.</p>
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <button className="carousel-nav" onClick={goPrevious}>
        ◀
      </button>

      <div className="carousel-track">
        <div
          className="carousel-slider"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: animate ? "transform .45s ease" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((task, i) => (
            <TaskItem
              key={`${task.id}-${i}`}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </div>
      </div>

      <button className="carousel-nav" onClick={goNext}>
        ▶
      </button>
    </div>
  );
}

export default TaskList;
