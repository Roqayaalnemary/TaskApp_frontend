// import React, { useState } from 'react';
// import './TasksPage.css'; // استيراد الـ CSS

// // استيراد الصورة بشكل صحيح
// import taskImage from '/src/assets/images/Done-rafiki.png'; // تأكد من المسار الصحيح للصورة

// export default function MessagesPage() {

//   const [tasks, setTasks] = useState([
//     { id: 1, text: 'Task 1', status: 'Completed' },
//     { id: 2, text: 'Task 2', status: 'In Progress' },
//   ]);

//   const [newTask, setNewTask] = useState('');

//   // دالة لإضافة مهام جديدة
//   const addTask = () => {
//     if (newTask.trim() !== '') {
//       const newTaskObject = { id: tasks.length + 1, text: newTask, status: 'In Progress' };
//       setTasks([...tasks, newTaskObject]);
//       setNewTask(''); // مسح الحقل بعد إضافة المهمة
//     }
//   };

//   // دالة لتعديل النص داخل المهمة
//   const editTask = (id, newText) => {
//     setTasks(tasks.map((task) =>
//       task.id === id ? { ...task, text: newText } : task
//     ));
//   };

//   // دالة لتحديث حالة المهمة (مكتملة أو قيد التقدم)
//   const updateTaskStatus = (id, newStatus) => {
//     setTasks(tasks.map((task) =>
//       task.id === id ? { ...task, status: newStatus } : task
//     ));
//   };

//   // دالة لحذف المهمة
//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   return (
//     <div className="dashboard">
//       <div className="task-progress">
//         {/* استخدام الصورة بعد استيرادها */}
//         <img src={taskImage} alt="Task Progress" />
//         <h3>Task Progress</h3>
//         <div className="progress-bar">
//           <div className="progress" style={{ width: '75%' }}></div>
//         </div>
//       </div>

//       <div className="tasks">
//         <h3>Tasks for Today</h3>
//         <ul>
//           {tasks.map((task) => (
//             <li key={task.id} className="task-item">
//               <input
//                 type="text"
//                 value={task.text}
//                 onChange={(e) => editTask(task.id, e.target.value)} 
//                 className="task-input"
//               />
//               <span className={task.status === 'Completed' ? 'completed' : 'in-progress'}>
//                 {task.status}
//               </span>
//               <div className="task-buttons">
//                 <button onClick={() => updateTaskStatus(task.id, 'Completed')} className="btn-complete">Complete</button>
//                 <button onClick={() => updateTaskStatus(task.id, 'In Progress')} className="btn-in-progress">In Progress</button>
//                 <button onClick={() => deleteTask(task.id)} className="btn-delete">Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>
        
//         <div className="add-task">
//           <input
//             type="text"
//             placeholder="Add new task"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             className="new-task-input"
//           />
//           <button onClick={addTask} className="add-task-btn">Add Task</button>
//         </div>
//       </div>

//       <div className="calendar">
//         <h3>Upcoming Events</h3>
//         <div className="calendar-view">
//           {}
//         </div>
//       </div>

//       <div className="statistics">
//         <h3>Statistics</h3>
//         <div className="stats-box">
//           <p>Total Tasks: {tasks.length}</p>
//           <p>Completed: {tasks.filter(task => task.status === 'Completed').length}</p>
//           <p>In Progress: {tasks.filter(task => task.status === 'In Progress').length}</p>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import Calendar from 'react-calendar'; // استيراد التقويم
// import 'react-calendar/dist/Calendar.css'; // استيراد الأنماط الخاصة بالتقويم
// import './TasksPage.css'; // استيراد ملف الـ CSS

// import taskImage from '/src/assets/images/Done-rafiki.png'; // تأكد من المسار الصحيح للصورة

// export default function TasksPage() {
//   const [tasks, setTasks] = useState([
//     { id: 1, text: 'Task 1', status: 'Completed', date: new Date(2025, 4, 3) },
//     { id: 2, text: 'Task 2', status: 'In Progress', date: new Date(2025, 4, 4) },
//     { id: 3, text: 'Task 3', status: 'Not Done', date: new Date(2025, 4, 5) },
//   ]);

//   const [newTask, setNewTask] = useState('');
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   // دالة لإضافة مهام جديدة
//   const addTask = () => {
//     if (newTask.trim() !== '') {
//       const newTaskObject = { 
//         id: tasks.length + 1, 
//         text: newTask, 
//         status: 'In Progress',
//         date: selectedDate 
//       };
//       setTasks([...tasks, newTaskObject]);
//       setNewTask(''); // مسح الحقل بعد إضافة المهمة
//     }
//   };

//   // دالة لتعديل النص داخل المهمة
//   const editTask = (id, newText) => {
//     setTasks(tasks.map((task) =>
//       task.id === id ? { ...task, text: newText } : task
//     ));
//   };

//   // دالة لتحديث حالة المهمة (مكتملة أو قيد التقدم)
//   const updateTaskStatus = (id, newStatus) => {
//     setTasks(tasks.map((task) =>
//       task.id === id ? { ...task, status: newStatus } : task
//     ));
//   };

//   // دالة لحذف المهمة
//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   // حساب نسبة الإنجاز
//   const completedTasks = tasks.filter(task => task.status === 'Completed').length;
//   const totalTasks = tasks.length;
//   const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

//   return (
//     <div className="dashboard">
//       <div className="task-progress">
//         <img src={taskImage} alt="Task Progress" />
//         <h3>Task Progress</h3>
//         <div className="progress-bar">
//           <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
//         </div>
//       </div>

//       <div className="tasks">
//         <h3>Tasks for Today</h3>
//         <ul>
//           {tasks.map((task) => (
//             <li key={task.id} className="task-item">
//               <input
//                 type="text"
//                 value={task.text}
//                 onChange={(e) => editTask(task.id, e.target.value)} 
//                 className="task-input"
//               />
//               <span className={task.status === 'Completed' ? 'completed' : task.status === 'In Progress' ? 'in-progress' : 'not-done'}>
//                 {task.status}
//               </span>
//               <div className="task-buttons">
//                 <button onClick={() => updateTaskStatus(task.id, 'Completed')} className="btn-complete">Complete</button>
//                 <button onClick={() => updateTaskStatus(task.id, 'In Progress')} className="btn-in-progress">In Progress</button>
//                 <button onClick={() => updateTaskStatus(task.id, 'Not Done')} className="btn-not-done">Not Done</button>
//                 <button onClick={() => deleteTask(task.id)} className="btn-delete">Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>
        
//         <div className="add-task">
//           <input
//             type="text"
//             placeholder="Add new task"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             className="new-task-input"
//           />
//           <button onClick={addTask} className="add-task-btn">Add Task</button>
//         </div>
//       </div>

//       {/* التقويم */}
//       <div className="calendar-container">
//         <h3>Upcoming Events</h3>
//         <Calendar
//           locale="en" 
//           onChange={setSelectedDate}
//           value={selectedDate}
//         />
//         <p>Selected Date: {selectedDate.toDateString()}</p>
//       </div>

//       <div className="statistics">
//         <h3>Statistics</h3>
//         <div className="stats-box">
//           <p>Total Tasks: {totalTasks}</p>
//           <p>Completed: {completedTasks}</p>
//           <p>Progress: {progressPercentage}%</p>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';
import Calendar from 'react-calendar'; // استيراد التقويم
import 'react-calendar/dist/Calendar.css'; // استيراد الأنماط الخاصة بالتقويم
import './TasksPage.css'; // استيراد ملف الـ CSS

import taskImage from '/src/assets/images/Done-rafiki.png'; // تأكد من المسار الصحيح للصورة

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Set your goals for today', status: 'Completed', date: new Date(2025, 4, 3) },
    { id: 2, text: 'Read a book for 30 minutes', status: 'In Progress', date: new Date(2025, 4, 4) },
  ]);

  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // دالة لإضافة مهام جديدة
  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = { 
        id: tasks.length + 1, 
        text: newTask, 
        status: 'In Progress',
        date: selectedDate 
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask(''); // مسح الحقل بعد إضافة المهمة
    }
  };

  // دالة لتعديل النص داخل المهمة
  const editTask = (id, newText) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  // دالة لتحديث حالة المهمة (مكتملة أو قيد التقدم)
  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  // دالة لحذف المهمة
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // حساب نسبة الإنجاز
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="dashboard">
      <div className="task-progress">
        <img src={taskImage} alt="Task Progress" />
        <h3>Task Progress</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <div className="tasks">
        <h3>Tasks for Today</h3>
        <ul>
          {tasks.map((task) => (
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
              <div className="task-buttons">
                <button onClick={() => updateTaskStatus(task.id, 'Completed')} className="btn-complete">Complete</button>
                <button onClick={() => updateTaskStatus(task.id, 'In Progress')} className="btn-in-progress">In Progress</button>
                <button onClick={() => updateTaskStatus(task.id, 'Not Done')} className="btn-not-done">Not Done</button>
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
          <button onClick={addTask} className="add-task-btn">Add Task</button>
        </div>
      </div>

      {/* التقويم */}
      <div className="calendar-container">
        <h3>Upcoming Events</h3>
        <Calendar
          locale="en" 
          onChange={setSelectedDate}
          value={selectedDate}
        />
        <p>Selected Date: {selectedDate.toDateString()}</p>
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
