import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import image from './assets/images/Task-amico.png';  
import './App.css'; 
import "./pages/HomePage/HomePage.css"; 


import SignupPage from './pages/SignupPage/SignupPage';  
import HomePage from './pages/HomePage/HomePage';  
import MessagesPage from './pages/MessagesPage/MessagesPage'; 
import CommentsPage from './pages/CommentsPage/CommentsPage'; 
import BulletinBoardPage from './pages/BulletinBoardPage/BulletinBoardPage'; 

function App() {
  const [user, setUser] = useState(null);  

  return (
      <div className="app-container">
        <header className="header">
          <div className="logo">
            <img src={image} alt="App Logo" className="app-logo" />
            <h1>Task Manager</h1>
          </div>
          <nav className="navbar">
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/messages">Messages</Link></li>
              <li><Link to="/comments">Comments</Link></li>
              <li><Link to="/bulletin-board">Bulletin Board</Link></li>
              <li><Link to="/signin">Sign in</Link></li>
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <Routes>  
            <Route path="/*" element={<HomePage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/comments" element={<CommentsPage />} />
            <Route path="/bulletin-board" element={<BulletinBoardPage />} />
            <Route path="/signup" element={<SignupPage setUser={setUser} />} />
            <Route path="/" element={<BulletinBoardPage />} />
            <Route path="/comments/:postId" element={<CommentsPage />} />

          </Routes>
        </main>
      </div>
  );
}

export default App;
