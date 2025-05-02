import { Link } from "react-router-dom"; // لاستخدام الروابط في React
import { useState } from "react";

// مكون لعرض بطاقة مهمة
export default function TaskCard({ task, updateTaskStatus, deleteTask }) {
  const [isSubmitting, setIsSubmitting] = useState(false); // حالة لتتبع حالة الزر أثناء التحديث أو الحذف

  // دالة لتحديث حالة المهمة
  const handleUpdateStatus = async (evt) => {
    evt.preventDefault();
    setIsSubmitting(true);
    try {
      // استدعاء دالة لتحديث الحالة (من الـ props)
      await updateTaskStatus(task.id, { completed: !task.completed });
    } catch (error) {
      console.error("Error updating task status:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // دالة لحذف المهمة
  const handleDeleteTask = async (evt) => {
    evt.preventDefault();
    setIsSubmitting(true);
    try {
      // استدعاء دالة لحذف المهمة (من الـ props)
      await deleteTask(task.id);
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="task-card">
      <div className="task-info">
        {/* رابط لعرض تفاصيل المهمة */}
        <Link to={`/tasks/${task.id}`}>
          <h5>{task.name}</h5>
        </Link>
        {/* عرض حالة المهمة */}
        <p>Status: {task.completed ? "Completed" : "In Progress"}</p>
      </div>

      <div className="task-actions">
        {/* زر لتحديث حالة المهمة */}
        <button
          onClick={handleUpdateStatus}
          disabled={isSubmitting}
          className="btn update-status"
        >
          {task.completed ? "Mark as In Progress" : "Mark as Completed"}
        </button>

        {/* زر لحذف المهمة */}
        <button
          onClick={handleDeleteTask}
          disabled={isSubmitting}
          className="btn delete-task"
        >
          Delete Task
        </button>
      </div>
    </div>
  );
}
