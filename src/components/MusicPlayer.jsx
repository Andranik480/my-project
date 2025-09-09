import React, { useState, useRef } from "react";
import "./MusicPlayer.css";

const songsData = [
  { id: 1, title: "Macan", url: "/music/song1.mp3" },
  { id: 2, title: "Macan", url: "/music/song2.mp3" },
  { id: 3, title: "JANAGA - Душа", url: "/music/song3.mp3" },
];

const MusicPlayer = () => {
  const [songs] = useState(songsData);
  const [search, setSearch] = useState("");
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(null);

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase())
  );

  const playSong = (song) => {
    setCurrentSong(song);

    setTimeout(() => {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Playback started");
            })
            .catch((err) => {
              console.log("Playback failed:", err);
            });
        }
      }
    }, 100);
  };

  return (
    <div className="music-player">
      <h2>🎵 My Music</h2>

      <input
        type="text"
        placeholder="Search music..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <ul className="song-list">
        {filteredSongs.map((song) => (
          <li
            key={song.id}
            className={currentSong?.id === song.id ? "active" : ""}
            onClick={() => playSong(song)}
          >
            <span>{song.title}</span>
          </li>
        ))}
      </ul>

      {currentSong && (
        <div className="player-controls">
          <h3>▶️ {currentSong.title}</h3>
          <audio
            key={currentSong.id} 
            ref={audioRef}
            src={process.env.PUBLIC_URL + currentSong.url}
            controls
            autoPlay
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
