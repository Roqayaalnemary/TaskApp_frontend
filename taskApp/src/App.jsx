import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import image from './assets/images/Task-amico.png';  
import './App.css'; 
import "./pages/HomePage/HomePage.css"; 

import { getUser, logout } from './components/utilities/user-api';


import SignupPage from './pages/SignupPage/SignupPage';  
import HomePage from './pages/HomePage/HomePage';  
import TasksPage from './pages/TasksPage/TasksPage'; 
import CommentsPage from './pages/CommentsPage/CommentsPage'; 
import BulletinBoardPage from './pages/BulletinBoardPage/BulletinBoardPage'; 

function App() {
  const [user, setUser] = useState();


  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      setUser(user);
    }
    fetchUser();
  }, [])

  function handleLogout() {
    logout()
    setUser(null);
    navigate("/")
}

console.log(user)
  return (
      <div className="app-container">
        <header className="header">
          <div className="logo">
            <img src={image} alt="App Logo" className="app-logo" />
            <h1>Task Manager</h1>
          </div>
          <nav className="navbar">
            <ul>
              { user
              ? <>
                  <li><Link to="/Tasks">Tasks</Link></li>
                  <li><Link to="/bulletin-board">Bulletin Board</Link></li>
                  <form id="logout-form" onSubmit={handleLogout}>
                  <button type="submit">Log out</button>
                    
                </form>
              </>
              : <>
                  <li><Link to="/home">Home</Link></li>
                  
              </>}
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <Routes>  
            { user 
            ? <>
                <Route path="/*" element={<TasksPage />} />
                <Route path="/comments" element={<CommentsPage user={user} />} />
                <Route path="/bulletin-board" element={<BulletinBoardPage user={user} />} />
                <Route path="/comments/:postId" element={<CommentsPage />} />
                <Route path="/comments/:postId" element={<CommentsPage />} />

            </>
            : <>
                <Route path="/*" element={<HomePage user={user} setUser={setUser} />} />
                <Route path="/signup" element={<SignupPage setUser={setUser} />} />
            </>}
          </Routes>
        </main>
      </div>
  );
}

export default App;
