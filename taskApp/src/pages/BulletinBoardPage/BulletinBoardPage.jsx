import React, { useState, useEffect } from 'react';
import './BulletinBoardPage.css'; 
import * as postsAPI from "../../components/utilities/posts-api";
import DisplayPosts from '../../components/DisplayPosts/DisplayPosts';

export default function BulletinBoardPage({ user }) {
  const [posts, setPosts] = useState([]);  
  const initialPostFormData = { title: '', content: '', image: "" }
  const [newPostFormData, setNewPostFormData] = useState(initialPostFormData)
  const [newComment, setNewComment] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);

  
  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPosts = await postsAPI.index();
        setPosts(allPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]); 
      }
    }
    fetchPosts();
  }, []);


  function handleChange(evt) { 
    setNewPostFormData({ ...newPostFormData, [evt.target.name]: evt.target.value });
  }

  async function handleAddPost(evt) {
    try {
      evt.preventDefault();
      const newPost = await postsAPI.create(newPostFormData);
      setPosts([...posts, newPost]);
      setNewPostFormData(initialPostFormData);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]); 
    }
  }

  async function handleUpdatePost(postId, updatedPost) {
    try {
      const updatedPosts = await postsAPI.update(postId, updatedPost);
      setPosts(updatedPosts);
    } catch (err) {
      console.error("Error updating post:", err);
    }
  }
  
  async function handleDeletePost(postId) {
    try {
      await postsAPI.deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
    } 
  }






  // const addComment = (postId) => {
  //   if (newComment.trim() && userName.trim()) {
  //     setPosts(posts.map(post =>
  //       post.id === postId
  //         ? { ...post, comments: [...post.comments, { text: newComment, author: userName }] }
  //         : post
  //     ));
  //     setNewComment('');
  //     localStorage.setItem('posts', JSON.stringify(posts));
  //   }
  // };

  // const deleteComment = (postId, commentIndex) => {
  //   setPosts(posts.map(post =>
  //     post.id === postId
  //       ? { ...post, comments: post.comments.filter((_, index) => index !== commentIndex) }
  //       : post
  //   ));
  //   localStorage.setItem('posts', JSON.stringify(posts));
  // };

  return (
    <div className="dashboard">
      <h3>Bulletin Board</h3>

      <form onSubmit={handleAddPost} className="add-post">
        <label htmlFor="title">Title:</label>
        <input id="title" type="text" placeholder="Post Title" name="title" value={newPostFormData.title} onChange={handleChange} />
        <label htmlFor="content">Content:</label>
        <textarea id="content" placeholder="Post Content" name="content" value={newPostFormData.content} onChange={handleChange}/>
        <label htmlFor="image">Image:</label>
        <input id="image" type="text" placeholder="Post Image" name="image" value={newPostFormData.image} onChange={handleChange} />
        <button type="submit">Add Post</button>
      </form>

      <div className="posts">
        { posts.length > 0
        ? posts.map((post) => (<DisplayPosts key={post.id} post={post} user={user} handleUpdatePost={handleUpdatePost} handleDeletePost={handleDeletePost} /> ))
        : <p>No posts available.</p>
        }
      </div>
    </div>

  );

}


// {selectedPostId === post.id && (
//   <div className="edit-post">
//     <input
//       type="text"
//       value={editablePost.title}
//       onChange={(e) => setEditablePost({ ...editablePost, title: e.target.value })}
//       placeholder="Edit Post Title"
//     />
//     <textarea
//       value={editablePost.content}
//       onChange={(e) => setEditablePost({ ...editablePost, content: e.target.value })}
//       placeholder="Edit Post Content"
//     />
//     <button onClick={savePost}>Save Post</button>
//   </div>
// )}

{/* <div className="comments-section">
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
</div> */}