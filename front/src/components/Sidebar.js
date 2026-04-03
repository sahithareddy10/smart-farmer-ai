import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h3>Menu</h3>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/chatbot">AI Chatbot</Link>
      <Link to="/weather">Weather</Link>
      <Link to="/market">Market Prices</Link>
      <Link to="/tasks">Farm Tasks</Link>
      <Link to="/disease">Crop Disease</Link>
      <Link to="/community">Community</Link>
      <Link to="/analytics">Analytics</Link>
      <Link to="/voice">Voice Assistant</Link>

    </div>
  );
}

export default Sidebar;