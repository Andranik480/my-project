import React, { useState } from "react";
import "./Sidebar.css";
import MusicPlayer from "./MusicPlayer";

const Sidebar = ({ user, selectedTab, setSelectedTab }) => {
  const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
  const [friends, setFriends] = useState(
    usersData.filter(u => user.friends?.includes(u.id))
  );
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState({});
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Add Friend
  const addFriend = friendId => {
    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      localStorage.setItem("usersData", JSON.stringify(usersData));
      setFriends([...friends, usersData.find(u => u.id === friendId)]);
    }
  };

  // Send Message
  const sendMessage = (friendId, text) => {
    setMessages(prev => {
      const newMessages = { ...prev };
      if (!newMessages[friendId]) newMessages[friendId] = [];
      newMessages[friendId].push({ from: user.id, text });
      return newMessages;
    });
  };

  const filteredUsers = usersData.filter(
    u => u.id !== user.id && u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sidebar">

      {/* User Info */}
      <div className="user-info">
        <img src={user.avatar || "https://i.pravatar.cc/100"} alt="avatar" />
        <h2>{user.username}</h2>
        <span className="status online">🟢 Online</span>
      </div>

      {/* Search */}
      <input
        className="search-bar"
        placeholder="🔍 Search friends..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Friends */}
      <h3>👥 Friends</h3>
      <ul className="friends-list">
        {friends.length > 0 ? (
          friends.map(f => (
            <li
              key={f.id}
              className={selectedFriend?.id === f.id ? "active-friend" : ""}
              onClick={() => setSelectedFriend(f)}
            >
              <img src={f.avatar || "https://i.pravatar.cc/50"} alt="avatar" />
              <div>
                <span>{f.username}</span>
                <p className="last-msg">
                  {messages[f.id]?.slice(-1)[0]?.text || "No messages yet"}
                </p>
              </div>
              <span className="status">{f.online ? "🟢" : "🔴"}</span>
            </li>
          ))
        ) : (
          <p>No friends yet 😢</p>
        )}
      </ul>

      {/* All Users */}
      <h3>🌍 All Users</h3>
      <ul className="users-list">
        {filteredUsers.map(u => (
          <li key={u.id}>
            <img src={u.avatar || "https://i.pravatar.cc/40"} alt="avatar" />
            <span>{u.username}</span>
            <button onClick={() => addFriend(u.id)}>➕ Add</button>
          </li>
        ))}
      </ul>

      {/* Chat Box */}
      {selectedFriend && (
        <div className="chat-box">
          <h4>💬 Chat with {selectedFriend.username}</h4>
          <div className="messages">
            {messages[selectedFriend.id]?.map((m, i) => (
              <div
                key={i}
                className={m.from === user.id ? "msg me" : "msg friend"}
              >
                {m.text}
              </div>
            )) || <p>No messages yet</p>}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              onKeyDown={e => {
                if (e.key === "Enter" && e.target.value.trim() !== "") {
                  sendMessage(selectedFriend.id, e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
