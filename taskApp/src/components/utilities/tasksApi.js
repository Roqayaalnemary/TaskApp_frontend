import sendRequest from "./sendRequest";  // افترض أن هذا ملف يرسل الطلبات إلى API

const url = "/tasks/";  // المسار الأساسي للـ tasks

// جلب جميع المهام
export async function index() {
    return sendRequest(url);  // إرسال طلب GET
}

// جلب مهمة واحدة باستخدام المعرف
export async function show(taskId) {
    return sendRequest(`${url}${taskId}/`);  // إرسال طلب GET مع المعرف
}

// إنشاء مهمة جديدة
export async function create(formData) {
    return sendRequest(url, "POST", formData);  // إرسال طلب POST مع البيانات
}

// تحديث مهمة
export async function update(taskId, formData) {
    return sendRequest(`${url}${taskId}/`, "PUT", formData);  // إرسال طلب PUT مع البيانات
}

// حذف مهمة
export async function deleteTask(taskId) {
    return sendRequest(`${url}${taskId}/`, "DELETE");  // إرسال طلب DELETE
}

// إضافة تعليق للمهمة
export async function addComment(taskId, commentData) {
    return sendRequest(`${url}${taskId}/add-comment/`, "POST", commentData);  // إرسال طلب POST
}

// إزالة تعليق من المهمة
export async function removeComment(taskId, commentId) {
    return sendRequest(`${url}${taskId}/remove-comment/${commentId}/`, "POST");  // إرسال طلب POST
}

// إضافة صورة للمهمة
export async function addPhoto(taskId, formData) {
    return sendRequest(`${url}${taskId}/add-photo/`, "POST", formData);  // إرسال طلب POST
}
