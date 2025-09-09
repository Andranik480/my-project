import React from "react";
import "./ProfileMenu.css";
import { Link } from "react-router-dom";

const ProfileMenu = ({ selectedTab, setSelectedTab }) => {
  return (
    <nav className="profile-menu">
      <h2><Link to="/home">FriendSphere</Link></h2>
      <ul>
        <li
          className={selectedTab === "posts" ? "active" : ""}
          onClick={() => setSelectedTab("posts")}
        >
          📑 My Posts
        </li>
        <li
          className={selectedTab === "friends" ? "active" : ""}
          onClick={() => setSelectedTab("friends")}
        >
          👥 Friends
        </li>
        <li
          className={selectedTab === "music" ? "active" : ""}
          onClick={() => setSelectedTab("music")}
        >
          🎵 Music
        </li>
        <li
          className={selectedTab === "settings" ? "active" : ""}
          onClick={() => setSelectedTab("settings")}
        >
          ⚙️ Settings
        </li>
        <li onClick={() => setSelectedTab("logout")}>🚪 Logout</li>
      </ul>
    </nav>
  );
};

export default ProfileMenu;
