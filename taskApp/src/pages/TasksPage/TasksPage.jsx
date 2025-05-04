import React, { useState } from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import './TasksPage.css'; 
import taskImage from '/src/assets/images/Done-rafiki.png'; 


export default function TasksPage() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Set your goals for today', status: 'Completed', date: new Date(2025, 4, 3), priority: 'Medium', recurrence: 'None' },
    { id: 2, text: 'Read a book for 30 minutes', status: 'In Progress', date: new Date(2025, 4, 4), priority: 'Low', recurrence: 'None' },
  ]);
  
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newPriority, setNewPriority] = useState('Medium');
  const [newRecurrence, setNewRecurrence] = useState('None');
  const [newReminder, setNewReminder] = useState(15);  // Reminder time in minutes

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = { 
        id: tasks.length + 1, 
        text: newTask, 
        status: 'In Progress',
        date: selectedDate,  // Each new task will have the selected date
        priority: newPriority,  // Add priority
        recurrence: newRecurrence,  // Add recurrence option
        reminder: newReminder  // Add reminder
      };
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

  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filter tasks based on selected date
  const tasksForSelectedDate = tasks.filter(task => task.date.toDateString() === selectedDate.toDateString());

  return (
    <div className="dashboard">
      <div className="task-progress">
        <img src={taskImage} alt="Task Progress" />
        <h3>Task Progress</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <div className="calendar-container">
        <h3>Upcoming Events</h3>
        <Calendar
          locale="en" 
          onChange={setSelectedDate}
          value={selectedDate}
        />
        <p>Selected Date: {selectedDate.toDateString()}</p>
      </div>

      <div className="tasks">
        <h3>Tasks for {selectedDate.toDateString()}</h3>
        <ul>
          {tasks.map((task) => (  // Display all tasks, not just the ones for the selected date
            <li key={task.id} className="task-item">
              <input
                type="text"
                value={task.text}
                onChange={(e) => editTask(task.id, e.target.value)} 
                className="task-input"
              />
              <span className={task.status === 'Completed' ? 'completed' : task.status === 'In Progress' ? 'in-progress' : 'not-done'}>
                {task.status}
              </span>

              {/* Display priority */}
              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>

              {/* Display recurrence */}
              <span className="recurrence">
                {task.recurrence !== 'None' ? `Recurs: ${task.recurrence}` : 'No recurrence'}
              </span>

              {/* Display reminder */}
              <span className="reminder">
                Reminder: {task.reminder} minutes before
              </span>

              <div className="task-buttons">
                <button onClick={() => updateTaskStatus(task.id, 'Completed')} className="btn-complete">Complete</button>
                <button onClick={() => updateTaskStatus(task.id, 'In Progress')} className="btn-in-progress">In Progress</button>
                <button onClick={() => deleteTask(task.id)} className="btn-delete">Delete</button>
              </div>
            </li>
          ))}
        </ul>
        
        <div className="add-task">
          <input
            type="text"
            placeholder="Add new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="new-task-input"
          />
          <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select value={newRecurrence} onChange={(e) => setNewRecurrence(e.target.value)}>
            <option value="None">No Recurrence</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <input
            type="number"
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            placeholder="Reminder time (minutes)"
          />
          <button onClick={addTask} className="add-task-btn">Add Task</button>
        </div>
      </div>

      <div className="statistics">
        <h3>Statistics</h3>
        <div className="stats-box">
          <p>Total Tasks: {totalTasks}</p>
          <p>Completed: {completedTasks}</p>
          <p>Progress: {progressPercentage}%</p>
        </div>
      </div>
    </div>
  );
}
