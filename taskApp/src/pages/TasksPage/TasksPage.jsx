import { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import './TasksPage.css'; 
import taskImage from '/src/assets/images/Done-rafiki.png'; 
import * as taskAPI from "../../components/utilities/tasksApi";  // دالة لإرسال الطلبات



const priorities = {
  h: "High",
  m: "Medium",
  l: "Low"
}

const recurrences = {
  none: "No Recurrence",
  d: "Daily",
  w: "Weekly",
  m: "Monthly"
}

export default function TasksPage() {
  const initialState = {
    title: "",
    description: "",
    completed: false,
    priority: "m",
    recurrence: "none"
  }
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState(initialState)
  const [selectedDate, setSelectedDate] = useState(new Date()); // ✅ إضافة التقويم فقط

  useEffect(() => {
    async function getTasks() {
      const allTasks = await taskAPI.index();
      setTasks(allTasks);
    }
    getTasks();
  }, []);

  console.log(tasks, "allTasks from TasksPage");

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }
  
  async function handleSubmit(evt) {
    try {
      evt.preventDefault();
      console.log("Sending new task:", {
        ...formData,
        date: selectedDate
      });
      const newTask = await taskAPI.create({
        ...formData,
        date: selectedDate  
      });

      setTasks([...tasks, newTask]);
      console.log("New task response:", newTask);
      setFormData(initialState);
    } catch (err) {
      console.log(err)
    }
  }

  async function updateTaskStatus(taskId) {
    try {
      // update the task status in the frontend
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: true };
        }
        return task;
      });
      setTasks(updatedTasks);

      console.log(updatedTasks, "updatedTasks");
      // Update the task status in the backend
      const taskUpdate = updatedTasks.find((task) => task.id === taskId);
      taskUpdate.completed = true;
      await taskAPI.updateTask(taskId, taskUpdate);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  }

  async function deleteTask(taskId) {
    try {
      console.log(taskId)
      await taskAPI.deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  }

  useEffect(() => {
    async function getTasks() {
      const allTasks = await taskAPI.index();
      const filteredTasks = allTasks.filter(task => 
        new Date(task.date).toDateString() === selectedDate.toDateString()
      );
      setTasks(filteredTasks); 

    }
    getTasks();
  }, [selectedDate]); 

  // const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;

  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filter tasks based on selected date
  // const tasksForSelectedDate = tasks.filter(task => task.date.toDateString() === selectedDate.toDateString());

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
        {/* <h3>Tasks for {selectedDate.toDateString()}</h3> */}
        <ul>
          {tasks.map((task) => (  // Display all tasks, not just the ones for the selected date
            <li key={task.id} className="task-item">
              <div>Title: {task.title}</div>
              <div>Description: {task.description}</div>
              <span className={task.completed ? 'completed' : 'in-progress' }>
                {task.completed ? 'completed' : 'in-progress' }
              </span>
              <span>
                {priorities[task.priority]}
              </span>
              <span className="recurrence">
                {task.recurrence !== 'None' ? `Recurs: ${recurrences[task.recurrence]}` : 'No recurrence'}
              </span>

              <div className="task-buttons">
                {!task.completed && <button onClick={() => updateTaskStatus(task.id)} className="btn-complete">Completed</button>}
                <button onClick={() => deleteTask(task.id)} className="btn-delete">Delete</button>
              </div>
            </li>
          ))}
        </ul>
        
        <form onSubmit={handleSubmit} className="add-task">
          <input type="text" name="title" placeholder="Add new task" value={formData.title} onChange={handleChange} className="new-task-input"/>
          <textarea type="textfield" name="description" value={formData.description} onChange={handleChange}></textarea>
          <select value={formData.priority} name="priority" onChange={handleChange}>
            <option value="h">High</option>
            <option value="m">Medium</option>
            <option value="l">Low</option>
          </select>
          <select value={formData.recurrence} name="recurrence" onChange={handleChange}>
            <option value="none">No Recurrence</option>
            <option value="d">Daily</option>
            <option value="w">Weekly</option>
            <option value="m">Monthly</option>
          </select>
          <button type="submit" className="add-task-btn">Add Task</button>
        </form>
      </div>


    </div>
  );
}


      // {<div className="statistics">
      //   <h3>Statistics</h3>
      //   <div className="stats-box">
      //     <p>Total Tasks: {totalTasks}</p>
      //     <p>Completed: {completedTasks}</p>
      //     <p>Progress: {progressPercentage}%</p>
      //   </div>
      // </div> }










      