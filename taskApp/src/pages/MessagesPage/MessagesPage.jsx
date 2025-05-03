import React, { useState } from 'react';
import './MessagesPage.css'; 

export default function MessagesPage() {

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', status: 'Completed' },
    { id: 2, text: 'Task 2', status: 'In Progress' },
  ]);

  const [newTask, setNewTask] = useState(''); 


  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = { id: tasks.length + 1, text: newTask, status: 'In Progress' };
      setTasks([...tasks, newTaskObject]);
      setNewTask(''); 
    }
  };


  const editTask = (id, newText) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="dashboard">
      <div className="task-progress">
        <h3>Task Progress</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: '75%' }}></div>
        </div>
      </div>

      <div className="tasks">
        <h3>Tasks for Today</h3>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="text"
                value={task.text}
                onChange={(e) => editTask(task.id, e.target.value)} 
              />
              <span className={task.status === 'Completed' ? 'completed' : 'in-progress'}>
                {task.status}
              </span>
              <button onClick={() => updateTaskStatus(task.id, 'Completed')}>Complete</button>
              <button onClick={() => updateTaskStatus(task.id, 'In Progress')}>In Progress</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="Add new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>

      <div className="calendar">
        <h3>Upcoming Events</h3>
        <div className="calendar-view">
          {/* يمكن إضافة تقويم أو موعد هنا */}
        </div>
      </div>

      <div className="statistics">
        <h3>Statistics</h3>
        <div className="stats-box">
          <p>Total Tasks: {tasks.length}</p>
          <p>Completed: {tasks.filter(task => task.status === 'Completed').length}</p>
          <p>In Progress: {tasks.filter(task => task.status === 'In Progress').length}</p>
        </div>
      </div>
    </div>
  );
}


