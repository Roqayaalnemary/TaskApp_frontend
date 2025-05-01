import { useState } from "react";
import { useNavigate } from "react-router";
import * as usersAPI from "../../components/utilities/user-api"; // استيراد الـ API

export default function SignupPage({ setUser }) {
    const navigate = useNavigate();
    const initialState = { username: "", password: "", confirmPassword: "", email: "" };
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({ username: '', password: '', email: '', confirmPassword: '' });

    // دالة التعامل مع التغييرات في النموذج
    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
        checkErrors(evt);
    }

    // التحقق من الأخطاء في النموذج
    function checkErrors({ target }) {
        const updateErrors = { ...errors };

        if (target.name === 'username') {
            updateErrors.username = target.value.length < 3 ? 'Username must be at least 3 characters.' : "";
        }
        if (target.name === 'password') {
            updateErrors.password = target.value.length < 3 ? 'Password must be at least 3 characters.' : "";
        }
        if (target.name === 'confirmPassword') {
            updateErrors.confirmPassword = target.value !== formData.password ? "Passwords must match." : "";
        }
        if (target.name === 'email') {
            updateErrors.email = !target.value.includes("@") ? 'Please enter a valid email.' : "";
        }

        setErrors(updateErrors);
    }

    // دالة إرسال النموذج للتسجيل
    async function handleSubmit(evt) {
        try {
            evt.preventDefault();
            const newUser = await usersAPI.signup(formData); // استدعاء دالة الـ signup من API
            setUser(newUser); // تحديث حالة المستخدم
            navigate("/cats"); // الانتقال إلى الصفحة التالية
        } catch (err) {
            console.log(err);
            setUser(null); // في حالة حدوث خطأ، تعيين حالة المستخدم إلى null
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* أكواد النموذج */}
            <input type="text" value={formData.username} name="username" onChange={handleChange} />
            {/* التحقق من الأخطاء */}
            { errors.username && <p>{errors.username}</p> }
            {/* ... المزيد من الحقول والتحقق من الأخطاء */}
            <button type="submit" >Submit!</button>
        </form>
    );
}
