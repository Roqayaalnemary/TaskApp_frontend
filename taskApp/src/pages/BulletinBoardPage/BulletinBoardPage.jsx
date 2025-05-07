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

