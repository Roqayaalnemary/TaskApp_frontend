import sendRequest from "./sendRequest"; // وظيفة إرسال الطلبات
const API_URL = "http://127.0.0.1:8000/api/tasks";
const url = "/users/";

// دالة للتسجيل
export async function signup(formData) {
    try {
        const response = await sendRequest(`${url}/signup/`, "POST", formData);
        localStorage.setItem('token', response.access); // تخزين التوكن في localStorage
        return response.user; // إعادة المستخدم بعد التسجيل
    } catch (err) {
        localStorage.removeItem('token'); // إذا حدث خطأ، إزالة التوكن المخزن
        return null; // إعادة null إذا فشل التسجيل
    }
}

// دالة لتسجيل الدخول
export function login() {
    // سيتم ملؤها لاحقًا
}

// دالة لتسجيل الخروج
export async function logout() {
    localStorage.removeItem('token'); // إزالة التوكن من localStorage عند تسجيل الخروج
}
