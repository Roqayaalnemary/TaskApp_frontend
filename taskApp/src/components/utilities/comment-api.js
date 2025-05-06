import sendRequest from "./sendRequest";  // افترض أن هذا ملف يرسل الطلبات إلى API

const url = "/comments/";  // المسار الأساسي للـ tasks





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
  