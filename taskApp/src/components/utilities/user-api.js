import sendRequest from "./sendRequest"; 
const url = "/users/";



export async function signup(formData) {
    try {
        const response = await sendRequest(`${url}signup/`, "POST", formData);
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








