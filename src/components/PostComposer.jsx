import React, { useState, useRef } from "react";
import "./PostComposer.css";

const PostComposer = ({ user, addPost }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    const newPost = {
      id: Date.now(),
      username: user.username,
      avatar: user.avatar || "/default-avatar.png",
      content,
      image,
      likes: 0,
      comments: [],
      createdAt: new Date().toLocaleString(),
    };

    addPost(newPost);
    setContent("");
    setImage(null);
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="post-composer" onSubmit={handleSubmit}>
      <div className="composer-header">
        <img src={user.avatar || "/default-avatar.png"} alt="avatar" className="avatar" />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder={`What's on your mind, ${user.username}?`}
          maxLength={500}
        />
      </div>

      {image && (
        <div className="preview">
          <img src={image} alt="preview" />
          <button type="button" onClick={() => setImage(null)}>✖</button>
        </div>
      )}

      <div className="composer-actions">
        <button type="button" onClick={() => fileInputRef.current.click()}>📷 Photo</button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <span className="char-count">{content.length}/500</span>
        <button type="submit" className="post-btn">Post</button>
      </div>
    </form>
  );
};

export default PostComposer;
