// src/pages/CommentsPage/CommentsPage.jsx
import React from 'react';

export default function CommentsPage() {
  return (
    <div>
      <h2>Comments</h2>
      <p>Check out the latest comments here.</p>
    </div>
  );
}



// import React, { useState, useEffect } from "react";
// // import { getComments, createComment, updateComment, deleteComment } from "../../utilities/comments-api"; // استيراد الدوال

// export default function CommentsPage() {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [editingComment, setEditingComment] = useState(null);
//   const [editedText, setEditedText] = useState("");

//   // تحميل التعليقات عند تحميل الصفحة
//   useEffect(() => {
//     const fetchComments = async () => {
//       const data = await getComments();
//       setComments(data);
//     };
//     fetchComments();
//   }, []);

//   // إضافة تعليق جديد
//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     if (newComment) {
//       const newCommentData = await createComment({ text: newComment });
//       setComments([...comments, newCommentData]);
//       setNewComment(""); // إعادة تعيين الحقل بعد الإضافة
//     }
//   };

//   // تعديل تعليق
//   const handleEditComment = (commentId, text) => {
//     setEditingComment(commentId);
//     setEditedText(text);
//   };

//   const handleUpdateComment = async (e) => {
//     e.preventDefault();
//     if (editedText && editingComment !== null) {
//       const updatedComment = await updateComment(editingComment, { text: editedText });
//       setComments(comments.map((comment) =>
//         comment.id === editingComment ? updatedComment : comment
//       ));
//       setEditingComment(null);
//       setEditedText("");
//     }
//   };

//   // حذف تعليق
//   const handleDeleteComment = async (commentId) => {
//     await deleteComment(commentId);
//     setComments(comments.filter(comment => comment.id !== commentId));
//   };

//   return (
//     <div>
//       <h2>Comments</h2>
      
//       {/* إضافة تعليق جديد */}
//       <form onSubmit={handleAddComment}>
//         <textarea 
//           value={newComment} 
//           onChange={(e) => setNewComment(e.target.value)} 
//           placeholder="Write a new comment..."
//         />
//         <button type="submit">Add Comment</button>
//       </form>

//       {/* عرض التعليقات */}
//       <ul>
//         {comments.map((comment) => (
//           <li key={comment.id}>
//             {editingComment === comment.id ? (
//               <form onSubmit={handleUpdateComment}>
//                 <textarea
//                   value={editedText}
//                   onChange={(e) => setEditedText(e.target.value)}
//                 />
//                 <button type="submit">Update</button>
//               </form>
//             ) : (
//               <>
//                 <p>{comment.text}</p>
//                 <button onClick={() => handleEditComment(comment.id, comment.text)}>Edit</button>
//                 <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }