import React, { useState } from 'react';
import './CommentsPage.css'; 

export default function CommentsPage() {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  const addComment = () => {
    if (commentText.trim()) {
      const newComment = { 
        id: comments.length + 1,
        text: commentText,
        author: 'Anonymous', 
        date: new Date().toLocaleString() 
      };

      // we have to create the information in the database and use our backend to store and leverage user information / persist that information over time
      // to do this we need to make requests from the frontend to the backend using url's to match the request to the proper function in the server.
      // a message can have many comments? right?
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  const editComment = (id, newText) => {
    setComments(comments.map((comment) =>
      comment.id === id ? { ...comment, text: newText } : comment
    ));
  };

  const deleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="comments-page-container">
      <h2>Comments Section</h2>

      {}
      <div className="input-field">
        <label>Add a Comment</label>
        <textarea
          placeholder="Write your comment here..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={addComment}>Post Comment</button>
      </div>

      {}
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

