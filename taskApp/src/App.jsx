// import { useState } from 'react';


// import { Link } from 'react-router';  // استيراد Link من react-router-dom
// import image from './assets/images/Task-amico.png';  // استيراد الصورة من مجلد assets
// import './App.css';  // استيراد ملفات CSS الخاصة بالتطبيق
// import SignupPage from './pages/SignupPage/SignupPage'; // استيراد صفحة التسجيل


// function App() {
//   const [currentPage, setCurrentPage] = useState('tasks');
//   const [tasks, setTasks] = useState([
//     { id: 1, title: "Task 1", description: "Description of Task 1", completed: false },
//     { id: 2, title: "Task 2", description: "Description of Task 2", completed: true },
//   ]);
//   const [messages, setMessages] = useState([
//     { id: 1, title: "Message 1", content: "This is the content of message 1", created_at: "2025-04-30" },
//     { id: 2, title: "Message 2", content: "This is the content of message 2", created_at: "2025-04-30" },
//   ]);
//   const [comments, setComments] = useState([
//     { id: 1, content: "Comment 1", created_at: "2025-04-30" },
//     { id: 2, content: "Comment 2", created_at: "2025-04-30" },
//   ]);
//   const [user, setUser] = useState(null);  // تعريف متغير المستخدم هنا

//   return (
//     <div className="app-container">
//       <header className="header">
//         {/* استخدم الصورة المستوردة هنا */}
//         <img src={image} alt="App Logo" className="app-logo" />

//         <div className="logo">
//           <h1>Task Manager</h1>
//         </div>
//         <nav className="navbar">
//           <ul>
//             {/* استخدم Link هنا للتنقل بين الصفحات */}
//             <li><Link to="/home">Home</Link></li>
//             <li><Link to="/messages">Messages</Link></li>
//             <li><Link to="/comments">Comments</Link></li>
//             <li><Link to="/bulletin-board">Bulletin Board</Link></li>
//             <li><Link to="/signup">Sign Up</Link></li> {/* رابط التسجيل */}
//           </ul>
//         </nav>
//       </header>

//       <main className="main-content">
//         {currentPage === 'tasks' && (
//           <section className="welcome">
//             <h2>Welcome, User!</h2>
//             <p>Manage your tasks, check messages, and interact with comments.</p>
//             <h2>Your Tasks</h2>
//             {tasks.map((task) => (
//               <div key={task.id} className={`task-card ${task.completed ? "completed" : ""}`}>
//                 <h3>{task.title}</h3>
//                 <p>{task.description}</p>
//                 <p>Status: {task.completed ? "Completed" : "In Progress"}</p>
//               </div>
//             ))}
//           </section>
//         )}

//         {currentPage === 'messages' && (
//           <section className="bulletin-board">
//             <h2>Messages</h2>
//             {messages.map((message) => (
//               <div key={message.id} className="message-card">
//                 <h3>{message.title}</h3>
//                 <p>{message.content}</p>
//                 <p>Created on: {message.created_at}</p>
//               </div>
//             ))}
//           </section>
//         )}

//         {currentPage === 'comments' && (
//           <section className="comment-list">
//             <h2>Comments</h2>
//             {comments.map((comment) => (
//               <div key={comment.id} className="comment-card">
//                 <p>{comment.content}</p>
//                 <p>Posted on: {comment.created_at}</p>
//               </div>
//             ))}
//           </section>
//         )}

//         {currentPage === 'bulletin-board' && (
//           <section className="bulletin-board">
//             <h2>Bulletin Board</h2>
//             <p>Stay updated with important announcements!</p>
//             <button>Post a Message</button>
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;



import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // استيراد التوجيه من react-router-dom
import image from './assets/images/Task-amico.png';  // استيراد الصورة من مجلد assets
import './App.css';  // استيراد ملفات CSS الخاصة بالتطبيق
import "./pages/HomePage/HomePage.css"; // تأكد من أن المسار صحيح

// استيراد الصفحات الخاصة بالتطبيق
import SignupPage from './pages/SignupPage/SignupPage';
import HomePage from './pages/HomePage/HomePage';  // صفحة الرئيسية
import MessagesPage from './pages/MessagesPage/MessagesPage';  // صفحة الرسائل
import CommentsPage from './pages/CommentsPage/CommentsPage';  // صفحة التعليقات
import BulletinBoardPage from './pages/BulletinBoardPage/BulletinBoardPage';  // صفحة لوحة الإعلانات

function App() {
  const [user, setUser] = useState(null);  // تعريف متغير المستخدم هنا

  return (
      <div className="app-container">
        <header className="header">
          <img src={image} alt="App Logo" className="app-logo" />
          <div className="logo">
            <h1>Task Manager</h1>
          </div>
          <nav className="navbar">
            <ul>
              <li><Link to="/home">Home</Link></li>  {/* رابط إلى الصفحة الرئيسية */}
              <li><Link to="/messages">Messages</Link></li>  {/* رابط إلى صفحة الرسائل */}
              <li><Link to="/comments">Comments</Link></li>  {/* رابط إلى صفحة التعليقات */}
              <li><Link to="/bulletin-board">Bulletin Board</Link></li>  {/* رابط إلى صفحة لوحة الإعلانات */}
              <li><Link to="/signup">Sign Up</Link></li>  {/* رابط إلى صفحة التسجيل */}
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <Routes>  {/* هنا يتم تحديد المسارات (routes) الخاصة بالتطبيق */}
            <Route path="/*" element={<HomePage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/comments" element={<CommentsPage />} />
            <Route path="/bulletin-board" element={<BulletinBoardPage />} />
            <Route path="/signup" element={<SignupPage setUser={setUser} />} />
          </Routes>
        </main>
      </div>
  );
}

export default App;
