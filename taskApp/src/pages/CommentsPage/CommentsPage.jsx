
// src/pages/CommentsPage/CommentsPage.jsx
// import React from 'react';

// export default function CommentsPage() {
//   return (
//     <div>
//       <h2>Comments</h2>
//       <p>Check out the latest comments here.</p>
//     </div>
//   );
// }


import React, { useState } from 'react';
import './CommentsPage.css'; // تأكد من ربط ملف الـ CSS

export default function CommentsPage() {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  // دالة لإضافة تعليق جديد
  const addComment = () => {
    if (commentText.trim()) {
      const newComment = { 
        id: comments.length + 1,
        text: commentText,
        author: 'Anonymous', // يمكنك تخصيص هذا لتكون اسم المستخدم
        date: new Date().toLocaleString() // إضافة التاريخ والوقت
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  // دالة لتعديل تعليق
  const editComment = (id, newText) => {
    setComments(comments.map((comment) =>
      comment.id === id ? { ...comment, text: newText } : comment
    ));
  };

  // دالة لحذف تعليق
  const deleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="comments-page-container">
      <h2>Comments Section</h2>

      {/* حقل إضافة تعليق جديد */}
      <div className="input-field">
        <label>Add a Comment</label>
        <textarea
          placeholder="Write your comment here..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={addComment}>Post Comment</button>
      </div>

      {/* عرض التعليقات */}
      <div className="comments-list">
        <h3>All Comments</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <div className="comment-header">
              <span className="comment-author">{comment.author}</span>
              <span className="comment-date">{comment.date}</span>
            </div>
            <p>{comment.text}</p>
            <div className="comment-actions">
              <button onClick={() => editComment(comment.id, prompt('Edit comment:', comment.text))}>Edit</button>
              <button onClick={() => deleteComment(comment.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
