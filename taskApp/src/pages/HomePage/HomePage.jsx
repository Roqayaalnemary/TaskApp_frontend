
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import './HomePage.css';  // استيراد ملفات CSS الخاصة بالصفحة

// function HomePage() {
//   const [userName, setUserName] = useState('');
//   const navigate = useNavigate(); // لاستخدام التوجيه

//   useEffect(() => {
//     const storedName = localStorage.getItem('userName');
//     if (storedName) {
//       setUserName(storedName); // تعيين اسم المستخدم المخزن في localStorage
//     } else {
//       navigate('/login'); // إذا لم يكن اسم المستخدم موجودًا، يتم توجيه المستخدم إلى صفحة تسجيل الدخول
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('userName');  // إزالة اسم المستخدم من localStorage
//     navigate('/login');  // توجيه المستخدم إلى صفحة تسجيل الدخول
//   };

//   return (
//     <div className="home-container">
//       {/* قسم الترحيب بالمستخدم */}
//       <div className="welcome-message">
//         <h1>Welcome, {userName}!</h1>
//       </div>

//       {/* عرض المهام الخاصة بالمستخدم */}
//       <div className="tasks-container">
//         <h2>Your Tasks</h2>
//         <ul>
//           <li className="task">
//             <h3>Task 1</h3>
//             <p>Description of Task 1</p>
//             <p>Status: In Progress</p>
//           </li>
//           <li className="task">
//             <h3>Task 2</h3>
//             <p>Description of Task 2</p>
//             <p>Status: Completed</p>
//           </li>
//           {/* يمكنك إضافة المزيد من المهام هنا */}
//         </ul>
//       </div>

//       {/* عرض لوحة الإعلانات */}
//       <div className="bulletin-board-container">
//         <h2>Bulletin Board</h2>
//         <ul>
//           <li className="bulletin-message">
//             <h3>Message 1</h3>
//             <p>This is the content of the first message.</p>
//           </li>
//           <li className="bulletin-message">
//             <h3>Message 2</h3>
//             <p>This is the content of the second message.</p>
//           </li>
//           {/* يمكنك إضافة المزيد من الرسائل هنا */}
//         </ul>
//       </div>

//       {/* زر تسجيل الخروج */}
//       <button onClick={handleLogout} className="logout-button">
        
//         Log Out
//       </button>
//     </div>
//   );
// }

// export default HomePage;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as usersAPI from "../../components/utilities/user-api";  // استيراد الـ API

export default function HomePage({ user, setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await usersAPI.login(formData);
      setUser(loggedInUser);
    } catch (err) {
      setErrorMessage("Login failed! Please check your credentials.");
    }
  };

  useEffect(() => {
    if (user) {
      // Fetch tasks after login
      const fetchTasks = async () => {
        // Replace with actual API for tasks
        const tasks = await usersAPI.getTasks();
        setTasks(tasks);
      };
      fetchTasks();
    }
  }, [user]);

  return (
    <div className="home-container">
      {!user ? (
        <div className="login-section">
          <h2>Login to your account</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      ) : (
        <div className="tasks-section">
          <h2>Welcome, {user.username}</h2>
          <h3>Your Tasks:</h3>
          <ul>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <li key={task.id}>{task.title} - {task.status}</li>
              ))
            ) : (
              <p>No tasks available</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
