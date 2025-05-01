import { useNavigate, Link } from "react-router-dom"; // لاستخدام التوجيه
import * as usersAPI from "../../utilities/users-api"; // استيراد الوظائف من `users-api.js`

export default function Navbar({ user, setUser }) {
    const navigate = useNavigate(); // للحصول على دالة التنقل

    // دالة لتسجيل الخروج
    function handleLogout() {
        usersAPI.logout(); // استدعاء دالة تسجيل الخروج
        setUser(null); // تعيين حالة المستخدم إلى null
        navigate("/"); // الانتقال إلى الصفحة الرئيسية بعد الخروج
    }

    if (user) {
        return (
            <>
                {/* الروابط التي تظهر إذا كان المستخدم مسجلاً */}
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/tasks">My Tasks</Link></li> {/* رابط للمهام */}
                <li><Link to="/messages">Messages</Link></li> {/* رابط للرسائل */}
                <li><Link to="/bulletin-board">Bulletin Board</Link></li> {/* رابط للوحة الإعلانات */}
                <form id="logout-form" onSubmit={handleLogout}>
                    <button type="submit">Log out</button>
                </form>
            </>
        );
    }

    if (!user) {
        return (
            <>
                {/* الروابط التي تظهر إذا كان المستخدم غير مسجل */}
                <li><Link to="/about">About</Link></li>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
            </>
        );
    }
}
