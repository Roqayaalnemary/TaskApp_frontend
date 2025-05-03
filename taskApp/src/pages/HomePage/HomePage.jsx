import React, { useState } from 'react';
import './HomePage.css'; 

export default function HomePage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login with", email, password);
    };

    return (
        <div className="home-container">
            <div className="image-section">
                <img src="/src/assets/images/Digital tools-pana.png" alt="Welcome" className="home-image" />
            </div>
            <div className="login-section">
                <h1>Log in</h1>
                <p>Hello, friend! I'm Smarttime – task manager you can trust everything. Let's get in touch!</p>
                <form onSubmit={handleLogin} className="login-form">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
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
                <p>Don’t have an account? <a href="/signup">Sign up</a></p>
            </div>
        </div>
    );
}
