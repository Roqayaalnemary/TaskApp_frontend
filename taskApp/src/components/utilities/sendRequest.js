// sendRequest.js
export default async function sendRequest(url, method = "GET", body = null) {
    const headers = {
        "Content-Type": "application/json",
    };

    // إذا كان هناك body (مثل البيانات التي سيتم إرسالها مع POST)، أضفه إلى الطلب
    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }


    try {
        const response = await fetch(`http://127.0.0.1:8000${url}`, options);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json(); // إرجاع البيانات المستلمة
    } catch (error) {
        console.error("There was an error with the fetch operation:", error);
        throw error;
    }
}
