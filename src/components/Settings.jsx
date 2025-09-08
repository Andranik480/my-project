import React, { useState } from "react";
import "./Settings.css";

const Settings = ({ user, updateUser }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = () => {
    if (!username.trim() || !email.trim()) {
      setMessage("Username and Email are required!");
      return;
    }

    // Get all users
    const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
    const updatedUsers = usersData.map(u => {
      if (u.id === user.id) {
        return {
          ...u,
          username,
          email,
          ...(password ? { password } : {}),
        };
      }
      return u;
    });

    localStorage.setItem("usersData", JSON.stringify(updatedUsers));
    updateUser({ ...user, username, email, ...(password ? { password } : {}) });
    setPassword("");
    setMessage("Settings updated successfully ✅");
  };

  return (
    <div className="settings-page">
      <h2>⚙️ Account Settings</h2>
      {message && <p className="message">{message}</p>}
      <div className="settings-form">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password (leave blank to keep current):
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;
