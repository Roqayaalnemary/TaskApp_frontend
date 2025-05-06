import React, { useState } from 'react';

export default function TaskCard({ task }) {
    const [commentContent, setCommentContent] = useState('');

    const handleCreateComment = async (e) => {
        e.preventDefault();

        const commentData = {
            content: commentContent,
            message: task.id,  // افتراض أن `task.id` هو معرف المهمة
        };

        try {
            const response = await fetch('http://localhost:8000/comments/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            });

            if (response.ok) {
                const newComment = await response.json();
                console.log('Comment created:', newComment);
                // يمكن إضافة التعليق الجديد إلى حالة الصفحة لتحديث الواجهة
            } else {
                console.error('Failed to create comment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="task-card">
            <h2>{task.title}</h2>
            <p>{task.description}</p>

            <h3>Comments</h3>
            <form onSubmit={handleCreateComment}>
                <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Write your comment here"
                />
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
}
