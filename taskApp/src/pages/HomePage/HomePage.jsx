
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './HomePage.css';  // استيراد ملفات CSS الخاصة بالصفحة

function HomePage() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); // لاستخدام التوجيه

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName); // تعيين اسم المستخدم المخزن في localStorage
    } else {
      navigate('/login'); // إذا لم يكن اسم المستخدم موجودًا، يتم توجيه المستخدم إلى صفحة تسجيل الدخول
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userName');  // إزالة اسم المستخدم من localStorage
    navigate('/login');  // توجيه المستخدم إلى صفحة تسجيل الدخول
  };

  return (
    <div className="home-container">
      {/* قسم الترحيب بالمستخدم */}
      <div className="welcome-message">
        <h1>Welcome, {userName}!</h1>
      </div>

      {/* عرض المهام الخاصة بالمستخدم */}
      <div className="tasks-container">
        <h2>Your Tasks</h2>
        <ul>
          <li className="task">
            <h3>Task 1</h3>
            <p>Description of Task 1</p>
            <p>Status: In Progress</p>
          </li>
          <li className="task">
            <h3>Task 2</h3>
            <p>Description of Task 2</p>
            <p>Status: Completed</p>
          </li>
          {/* يمكنك إضافة المزيد من المهام هنا */}
        </ul>
      </div>

      {/* عرض لوحة الإعلانات */}
      <div className="bulletin-board-container">
        <h2>Bulletin Board</h2>
        <ul>
          <li className="bulletin-message">
            <h3>Message 1</h3>
            <p>This is the content of the first message.</p>
          </li>
          <li className="bulletin-message">
            <h3>Message 2</h3>
            <p>This is the content of the second message.</p>
          </li>
          {/* يمكنك إضافة المزيد من الرسائل هنا */}
        </ul>
      </div>

      {/* زر تسجيل الخروج */}
      <button onClick={handleLogout} className="logout-button">
        Log Out
      </button>
    </div>
  );
}

export default HomePage;




