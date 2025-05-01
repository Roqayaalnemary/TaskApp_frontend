import React from 'react';
import './TaskIndexCard.css';  // استيراد ملف التنسيق (CSS)

function TaskIndexCard({ task }) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <p className={`task-status ${task.completed ? "completed" : "pending"}`}>
        {task.completed ? "Completed" : "In Progress"}
      </p>
    </div>
  );
}

export default TaskIndexCard;
