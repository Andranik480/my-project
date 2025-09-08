import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/home" /> : <Login setUser={setUser} />} />
        <Route path="/home" element={user ? <Home user={user} logout={logout} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
