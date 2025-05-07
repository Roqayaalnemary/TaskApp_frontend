import { useEffect, useState } from "react";
import * as postAPI from "../utilities/posts-api";
const fallbackImg = "https://i.pinimg.com/736x/b8/cc/35/b8cc357cccc871e4335e13c9506eb7fa.jpg";


export default function DisplayPosts({post, handleUpdatePost, handleDeletePost}) {
    const [postFormData, setPostFormData] = useState({ content: post.content });
    const [newComment, setNewComment] = useState('');
    const [edit, setEdit] = useState(false);
    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        async function getAllComments() {
            try {
                const allCommentsFromDB = await postAPI.getAllComments(post.id);
                setAllComments(allCommentsFromDB);
            } catch (err) {
                console.error(err);
            }
        }
        getAllComments();
    }, [])

    function handleChange(evt) {
        setPostFormData({ ...postFormData, [evt.target.name]: evt.target.value });
    }

    async function addComment(evt) {
        try {
            evt.preventDefault();
            const commentData = {
                content: newComment,
                message: post.id,  // Assuming `post.id` is the ID of the post
            }; 
            const newDBComment = await postAPI.createComment(commentData);
            setNewComment("")
            setAllComments([...allComments, newDBComment])
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    }

    return (
        <div className="post-card">
            <div className="post-header">
              <h4>{post.title}</h4>
              <span className="author">Posted by: {post.user.username}</span>
              <div className="post-actions">
                <button onClick={() => setEdit(!edit)}>{ edit ? "Cancel" : "Edit" }</button>
                {edit && <button onClick={() => handleUpdatePost(post.id, postFormData)}>Save</button>}
                <button onClick={() => handleDeletePost(post.id)} >Delete</button>
              </div>
              {post.image && <img src={post.image} onError={(e) => { e.target.onerror=null, e.target.src=fallbackImg}} alt="Post" className="post-image" />}
            </div>
        { edit
          ? <>
          <form >
            <input type="text" value={postFormData.content} onChange={handleChange} name="content" />
          </form>
          </>
          : <p>{post.content}</p>
        }
        <form onSubmit={addComment}>
            <label htmlFor="new-comment">Add Comment:</label>
            <input id="new-comment" type="text" value={newComment} onChange={(evt) => setNewComment(evt.target.value)} />
            <button type="submit">Add Comment</button>
        </form>
        <div>
            {allComments.map(comment => (
                <h3 key={comment.id}>{comment.content}</h3>
            ))}
        </div>
      </div>
    )
}