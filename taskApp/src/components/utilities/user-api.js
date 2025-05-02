import sendRequest from "./sendRequest"; 
const API_URL = "http://127.0.0.1:8000/api/tasks";
const url = "/users/";



export async function signup(formData) {
    try {
        const response = await sendRequest(`${url}/signup/`, "POST", formData);
        localStorage.setItem('token', response.access); 
        return response.user; 
    } catch (err) {
        localStorage.removeItem('token'); 
        console.error("Signup error:", err); 
        return null; 
    }
}

export async function login(formData) {
    try {
        const response = await sendRequest(`${url}login/`, "POST", formData);
        localStorage.setItem('token', response.access); 
        return response.user; 
    } catch (err) {
        localStorage.removeItem('token'); 
        console.error("Login error:", err); 
        return null; 
    }
}

export function logout() {
    localStorage.removeItem('token'); 
}

export async function getUser() {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const response = await sendRequest(`${url}token/refresh/`);
            localStorage.setItem('token', response.access); 
            return response.user; 
        }
        return null; 
    } catch (err) {
        console.log("Get user error:", err); 
        return null; 
    }
}

// دالة لإنشاء رسالة جديدة
export const createMessage = async (formData) => {
    try {
        const response = await fetch('/api/messages/', {
            method: 'POST',
            body: formData,  // تأكد من أن البيانات يتم إرسالها بشكل صحيح
        });
        return await response.json();
    } catch (err) {
        console.error("Error creating message:", err);
        throw err;  // إرسال الخطأ إلى الكود الذي استدعى هذه الدالة
    }
};


// في ملف user-api.js

// مثال لدالة createTask
export async function createTask(taskData) {
    try {
        const response = await sendRequest('/tasks', 'POST', taskData);
        return response;
    } catch (error) {
        console.error("Error creating task:", error);
    }
}




// إضافة الدالة createComment
export const createComment = async (data) => {
    const response = await fetch('/api/comments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create comment');
    }
  
    const comment = await response.json();
    return comment;
  };
  


