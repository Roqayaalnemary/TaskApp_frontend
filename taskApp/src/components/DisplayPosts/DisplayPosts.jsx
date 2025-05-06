import { useState } from "react"


export default function DisplayPosts({post, user, handleUpdatePost, handleDeletePost}) {
    const [postFormData, setPostFormData] = useState({ content: post.content });
    const [edit, setEdit] = useState(false);

    function handleChange(evt) {
        setPostFormData({ ...postFormData, [evt.target.name]: evt.target.value });
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
            </div>
        { edit
          ? <>
          <form >
            <input type="text" value={postFormData.content} onChange={handleChange} name="content" />
          </form>
          </>
          : <p>{post.content}</p>
        }
      </div>
    )
}