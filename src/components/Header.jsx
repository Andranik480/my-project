import React from "react";
import "./Header.css";

const Header = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="header">
      <h1>FriendSphere</h1>
      <div className="header-actions">
        <span>Hello, {user.username}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
