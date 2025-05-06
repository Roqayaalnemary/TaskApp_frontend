// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// export default function CommentDetailPage() {
//   const { commentId } = useParams(); 
//   const [comment, setComment] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
//     const commentDetail = storedComments.find((c) => c.id === parseInt(commentId));
//     setComment(commentDetail);
//   }, [commentId]);

 
//   const goBack = () => {
//     navigate(-1);  
//   };

//   return (
//     <div>
//       <button onClick={goBack}>Go Back</button>
//       {comment ? (
//         <div>
//           <h2>Comment Details</h2>
//           <p><strong>Author:</strong> {comment.author}</p>
//           <p><strong>Posted On:</strong> {comment.date}</p>
//           <p><strong>Comment:</strong> {comment.text}</p>
//         </div>
//       ) : (
//         <p>Comment not found.</p>
//       )}
//     </div>
//   );
// }
