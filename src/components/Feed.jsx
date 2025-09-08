import React, { useState } from "react";
import PostComposer from "./PostComposer";
import "./Feed.css";

const Feed = ({ user }) => {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("posts");
    return saved ? JSON.parse(saved) : [];
  });

  // Add new post
  const addPost = newPost => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  // Delete post
  const deletePost = id => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  // Like/unlike post
  const toggleLike = id => {
    const updatedPosts = posts.map(post => {
      if (post.id === id) {
        return { ...post, likes: post.likedByUser ? post.likes - 1 : post.likes + 1, likedByUser: !post.likedByUser };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  // Add comment
  const addComment = (id, text) => {
    if (!text.trim()) return;
    const updatedPosts = posts.map(post => {
      if (post.id === id) {
        return { ...post, comments: [...post.comments, { id: Date.now(), username: user.username, text }] };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="feed">
      <PostComposer user={user} addPost={addPost} />

      {posts.length === 0 && (
        <p className="no-posts">No posts yet. Be the first to share something! 🌟</p>
      )}

      {posts.map(post => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <h4>{post.username}</h4>
            {post.username === user.username && (
              <button className="delete-btn" onClick={() => deletePost(post.id)}>🗑️</button>
            )}
          </div>
          <p className="post-content">{post.content}</p>
          <div className="post-actions">
            <button className={`like-btn ${post.likedByUser ? "liked" : ""}`} onClick={() => toggleLike(post.id)}>
              ❤️ {post.likes}
            </button>
          </div>

          {/* Comments */}
          <div className="comments-section">
            {post.comments.map(c => (
              <div key={c.id} className="comment">
                <strong>{c.username}:</strong> {c.text}
              </div>
            ))}
            <input
              className="comment-input"
              type="text"
              placeholder="Write a comment..."
              onKeyDown={e => {
                if (e.key === "Enter") {
                  addComment(post.id, e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
