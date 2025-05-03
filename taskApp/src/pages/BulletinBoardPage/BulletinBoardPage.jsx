import React, { useState } from 'react';
import './BulletinBoardPage.css'; // استيراد ملف الـ CSS

export default function BulletinBoardPage() {
  // حالة الإعلانات
  const [posts, setPosts] = useState([
    { id: 1, title: 'Task 1', content: 'This is the content for Task 1', author: 'John Doe', comments: [] },
    { id: 2, title: 'Task 2', content: 'This is the content for Task 2', author: 'Jane Smith', comments: [] }
  ]);

  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newComment, setNewComment] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);

  // دالة لإضافة إعلان جديد (Create)
  const addPost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const newPostObject = {
        id: posts.length + 1,
        title: newPost.title,
        content: newPost.content,
        author: 'Anonymous',
        comments: []
      };
      setPosts([...posts, newPostObject]);
      setNewPost({ title: '', content: '' }); // مسح حقل الإدخال بعد الإضافة
    }
  };

  // دالة لتعديل محتوى الإعلان (Update)
  const editPost = (id, newTitle, newContent) => {
    setPosts(posts.map(post => post.id === id ? { ...post, title: newTitle, content: newContent } : post));
  };

  // دالة لحذف إعلان (Delete)
  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  // دالة لإضافة تعليق (Create)
  const addComment = (postId) => {
    if (newComment.trim()) {
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      ));
      setNewComment('');
    }
  };

  // دالة لحذف تعليق (Delete)
  const deleteComment = (postId, commentIndex) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: post.comments.filter((_, index) => index !== commentIndex) }
        : post
    ));
  };

  return (
    <div className="dashboard">
      <h3>Bulletin Board</h3>

      {/* إضافة إعلان جديد */}
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
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <h4>{post.title}</h4>
              <span className="author">Posted by: {post.author}</span>
              <div className="post-actions">
                <button onClick={() => deletePost(post.id)}>Delete</button>
                <button onClick={() => setSelectedPostId(post.id)}>Edit</button>
              </div>
            </div>
            <p>{post.content}</p>

            {/* قسم التعليقات */}
            <div className="comments-section">
              <h5>Comments:</h5>
              {post.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p>{comment}</p>
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

            {/* تعديل الإعلان */}
            {selectedPostId === post.id && (
              <div className="edit-post">
                <input
                  type="text"
                  placeholder="Edit Title"
                  value={post.title}
                  onChange={(e) => editPost(post.id, e.target.value, post.content)}
                />
                <textarea
                  placeholder="Edit Content"
                  value={post.content}
                  onChange={(e) => editPost(post.id, post.title, e.target.value)}
                />
                <button onClick={() => setSelectedPostId(null)}>Save</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
