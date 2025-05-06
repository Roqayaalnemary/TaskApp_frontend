import sendRequest from "./sendRequest";  // افترض أن هذا ملف يرسل الطلبات إلى API

const url = "/posts/";  // المسار الأساسي للـ tasks

// جلب جميع المهام
export async function index() {
    return sendRequest(url);  // إرسال طلب GET
}

export async function create(formData) {
    return sendRequest(url, "POST", formData);  // إرسال طلب GET
}

export async function update(postId, formData) {
    return sendRequest(`${url}${postId}/`, "PUT", formData);  // إرسال طلب GET
}

export async function deletePost(postId) {
    return sendRequest(`${url}${postId}/`, "DELETE");  // إرسال طلب GET
}