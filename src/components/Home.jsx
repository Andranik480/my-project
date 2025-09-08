import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import ProfileMenu from "./ProfileMenu";
import MusicPlayer from "./MusicPlayer";
import "./Home.css";
import Settings from "./Settings";

const Home = ({ user, logout }) => {
  const [selectedTab, setSelectedTab] = useState("posts");

  return (
    <div className="home-container">
      {/* Profile Menu on top */}
      <ProfileMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {/* Main content scrollable */}
      <div className="home-main">
        {/* Sidebar */}
        <Sidebar user={user} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {/* Feed / Dynamic Content based on selected tab */}
        <div className="content-area">
          {selectedTab === "posts" && <Feed user={user} />}
          {selectedTab === "friends" && <Sidebar user={user} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />}
          {selectedTab === "music" && <MusicPlayer />}
          {selectedTab === "settings" && <Settings user={user} />}
          {selectedTab === "logout" && logout()}
        </div>
      </div>
    </div>
  );
};

export default Home;
