
import React, { useState, useEffect } from 'react';
import './CommentsPage.css'; 

export default function CommentsPage({ postId }) {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(`/api/posts/${postId}/comments`);
        const data = await response.json();
        setComments(data); 
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    }

    fetchComments();
  }, [postId]); 

  const addComment = async () => {
    if (commentText.trim()) {
      const newComment = {
        text: commentText,
        author: 'Anonymous', 
        date: new Date().toLocaleString(),
      };

      try {
        const response = await fetch(`/api/posts/${postId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newComment),
        });
        
        if (response.ok) {
          const addedComment = await response.json();
          setComments([...comments, addedComment]); 
          setCommentText(''); 
        } else {
          console.error('Failed to add comment');
        }
      } catch (err) {
        console.error('Error adding comment:', err);
      }
    }
  };

  // تعديل تعليق
  const editComment = async (id, newText) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newText }),
      });

      if (response.ok) {
        const updatedComment = await response.json();
        setComments(comments.map((comment) =>
          comment.id === id ? updatedComment : comment
        ));
      } else {
        console.error('Failed to edit comment');
      }
    } catch (err) {
      console.error('Error editing comment:', err);
    }
  };

  const deleteComment = async (id) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setComments(comments.filter((comment) => comment.id !== id)); 
      } else {
        console.error('Failed to delete comment');
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  return (
    <div className="comments-page-container">
      <h2>Comments Section</h2>

      <div className="input-field">
        <label>Add a Comment</label>
        <textarea
          placeholder="Write your comment here..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={addComment}>Post Comment</button>
      </div>

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
