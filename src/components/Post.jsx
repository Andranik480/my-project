import React, { useState } from "react";
import "./Post.css";

const Post = ({ post, user, deletePost }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) setLikes(likes + 1);
    else setLikes(likes - 1);
    setLiked(!liked);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <strong>{post.username}</strong>
        {post.username === user.username && <button onClick={() => deletePost(post.id)}>🗑️</button>}
      </div>
      <p>{post.content}</p>
      <div className="post-footer">
        <span onClick={handleLike} className={liked ? "liked" : ""}>👍 {likes}</span>
        <span>💬 {post.comments?.length || 0}</span>
      </div>
    </div>
  );
};

export default Post;
