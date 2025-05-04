import React, { useState } from 'react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; 
import * as usersAPI from "../../components/utilities/user-api.js";

export default function HomePage({ user, setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        try {
            e.preventDefault();
            const loggedInUser = await usersAPI.login({ username, password });
            console.log(loggedInUser, "loggedInUser from HomePage");
            setUser(loggedInUser);
            setUsername("");
            setPassword("");
            navigate("/home");
        } catch (err) {
            console.log(err);
            setUser(null);
        }
    };


    return (
        <div className="home-container">
            <div className="image-section">
                <img src="/src/assets/images/Digital tools-pana.png" alt="Welcome" className="home-image" />
            </div>
            <div className="login-section">
                <h1>Log in</h1>
                <p>Hello, friend! I'm Smarttime – task manager you can trust everything. Let's get in touch!</p>
                {user 
                ? <h1>Welcome Back!</h1>
                : <>
                    <form onSubmit={handleLogin} className="login-form">
                        <input 
                            type="username" 
                            placeholder="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <button type="submit" className="login-btn">Let's start!</button>
                    </form>
                    <div className="social-login">
                        <button className="social-btn facebook">
                            <img src="/src/assets/images/facebook.png" alt="Facebook" />
                        </button>
                        <button className="social-btn google">
                            <img src="/src/assets/images/google.png" alt="Google" />
                        </button>
                    </div>
                    <p>Don’t have an account? <Link to="/signup">Sign up</Link></p>
                </>}
            </div>
        </div>
    );
}
