import React, { useState, useEffect } from 'react';
import './BulletinBoardPage.css'; 

export default function BulletinBoardPage() {
  const [posts, setPosts] = useState([]);  
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newComment, setNewComment] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [userName, setUserName] = useState('');
  const [editablePost, setEditablePost] = useState({ title: '', content: '' });

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  const addPost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const newPostObject = {
        id: posts.length + 1,
        title: newPost.title,
        content: newPost.content,
        author: userName || 'Anonymous',  // Default to 'Anonymous' if no name is provided
        comments: []
      };
      setPosts([...posts, newPostObject]);
      setNewPost({ title: '', content: '' });
      localStorage.setItem('posts', JSON.stringify([...posts, newPostObject]));
    }
  };

  const editPost = (id) => {
    const postToEdit = posts.find(post => post.id === id);
    if (postToEdit) {
      setEditablePost({ title: postToEdit.title, content: postToEdit.content });
      setSelectedPostId(id);
    }
  };

  const savePost = () => {
    setPosts(posts.map(post => 
      post.id === selectedPostId 
        ? { ...post, title: editablePost.title, content: editablePost.content } 
        : post
    ));
    localStorage.setItem('posts', JSON.stringify(posts));
    setSelectedPostId(null);  // Clear selected post ID after saving
    setEditablePost({ title: '', content: '' });  // Clear editable fields
  };

  const addComment = (postId) => {
    if (newComment.trim() && userName.trim()) {
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, { text: newComment, author: userName }] }
          : post
      ));
      setNewComment('');
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  };

  const deleteComment = (postId, commentIndex) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: post.comments.filter((_, index) => index !== commentIndex) }
        : post
    ));
    localStorage.setItem('posts', JSON.stringify(posts));
  };

  return (
    <div className="dashboard">
      <h3>Bulletin Board</h3>

      <div>
        <label>Enter Your Name:</label>
        <input 
          type="text" 
          value={userName}
          onChange={(e) => setUserName(e.target.value)} 
          placeholder="Your Name"
        />
      </div>

      <div className="add-post">
        <input
          type="text"
          placeholder="Post Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Post Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button onClick={addPost}>Add Post</button>
      </div>

      <div className="posts">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <h4>{post.title}</h4>
                <span className="author">Posted by: {post.author}</span>
                <div className="post-actions">
                  <button onClick={() => editPost(post.id)}>Edit</button>
                  <button onClick={() => setPosts(posts.filter(p => p.id !== post.id))}>Delete</button>
                </div>
              </div>
              <p>{post.content}</p>

              {/* Show editing fields if this post is selected */}
              {selectedPostId === post.id && (
                <div className="edit-post">
                  <input
                    type="text"
                    value={editablePost.title}
                    onChange={(e) => setEditablePost({ ...editablePost, title: e.target.value })}
                    placeholder="Edit Post Title"
                  />
                  <textarea
                    value={editablePost.content}
                    onChange={(e) => setEditablePost({ ...editablePost, content: e.target.value })}
                    placeholder="Edit Post Content"
                  />
                  <button onClick={savePost}>Save Post</button>
                </div>
              )}

              <div className="comments-section">
                <h5>Comments:</h5>
                {post.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <p><strong>{comment.author}</strong>: {comment.text}</p>
                    <button onClick={() => deleteComment(post.id, index)}>Delete Comment</button>
                  </div>
                ))}
                <textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={() => addComment(post.id)}>Add Comment</button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}





