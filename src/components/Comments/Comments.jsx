// components/Comments/Comments.jsx
import React, { useState } from 'react';

const Comments = () => {
  // Fetch and handle comments here
  // For now, we'll use dummy data
  const [comments] = useState([
    {
      author: 'User1',
      content: 'Great video!',
    },
    {
      author: 'User2',
      content: 'Very informative!',
    },
    // Add more comments...
  ]);

  return (
    <div className="comments">
      <details>
        <summary>Comments</summary>
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <strong>{comment.author}: </strong>
              <span>{comment.content}</span>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
};

export default Comments;
