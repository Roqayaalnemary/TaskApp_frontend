import { useState } from 'react';
import image from './assets/images/Task-amico.png';  // استيراد الصورة من مجلد assets
import './App.css';  // استيراد ملفات CSS الخاصة بالتطبيق

function App() {
  const [currentPage, setCurrentPage] = useState('tasks');
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", description: "Description of Task 1", completed: false },
    { id: 2, title: "Task 2", description: "Description of Task 2", completed: true },
  ]);
  const [messages, setMessages] = useState([
    { id: 1, title: "Message 1", content: "This is the content of message 1", created_at: "2025-04-30" },
    { id: 2, title: "Message 2", content: "This is the content of message 2", created_at: "2025-04-30" },
  ]);
  const [comments, setComments] = useState([
    { id: 1, content: "Comment 1", created_at: "2025-04-30" },
    { id: 2, content: "Comment 2", created_at: "2025-04-30" },
  ]);

  return (
    <div className="app-container">
      <header className="header">
        {/* استخدم الصورة المستوردة هنا */}
        <img src={image} alt="App Logo" className="app-logo" />

        <div className="logo">
          <h1>Task Manager</h1>
        </div>
        <nav className="navbar">
          <ul>
            <li><a href="#" onClick={() => setCurrentPage('tasks')}>Home</a></li>
            <li><a href="#" onClick={() => setCurrentPage('messages')}>Messages</a></li>
            <li><a href="#" onClick={() => setCurrentPage('comments')}>Comments</a></li>
            <li><a href="#" onClick={() => setCurrentPage('bulletin-board')}>Bulletin Board</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        {currentPage === 'tasks' && (
          <section className="welcome">
            <h2>Welcome, User!</h2>
            <p>Manage your tasks, check messages, and interact with comments.</p>
            <h2>Your Tasks</h2>
            {tasks.map((task) => (
              <div key={task.id} className={`task-card ${task.completed ? "completed" : ""}`}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Status: {task.completed ? "Completed" : "In Progress"}</p>
              </div>
            ))}
          </section>
        )}

        {currentPage === 'messages' && (
          <section className="bulletin-board">
            <h2>Messages</h2>
            {messages.map((message) => (
              <div key={message.id} className="message-card">
                <h3>{message.title}</h3>
                <p>{message.content}</p>
                <p>Created on: {message.created_at}</p>
              </div>
            ))}
          </section>
        )}

        {currentPage === 'comments' && (
          <section className="comment-list">
            <h2>Comments</h2>
            {comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <p>{comment.content}</p>
                <p>Posted on: {comment.created_at}</p>
              </div>
            ))}
          </section>
        )}

        {currentPage === 'bulletin-board' && (
          <section className="bulletin-board">
            <h2>Bulletin Board</h2>
            <p>Stay updated with important announcements!</p>
            <button>Post a Message</button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;



