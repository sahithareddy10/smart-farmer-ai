import { Link, useLocation } from "react-router-dom";
import "../styles/dashboard.css";

/* Sidebar */
function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "AI Chatbot", path: "/chatbot" },
    { name: "Weather", path: "/weather" },
    { name: "Market Prices", path: "/market" },
    { name: "Farm Tasks", path: "/tasks" },
    { name: "Crop Disease", path: "/disease" },
    { name: "Community", path: "/community" },
    { name: "Analytics", path: "/analytics" },
    { name: "Voice Assistant", path: "/voice" }
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">🌾 Smart Farmer AI</h2>

      <ul>
        {menu.map((item, i) => (
          <li key={i} className={location.pathname === item.path ? "active" : ""}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Main Content */
function Home() {
  return (
    <div className="main">
      <h1>Welcome Farmer 👋</h1>

      <div className="cards">
        <div className="card">🌤 Weather Insights</div>
        <div className="card">💰 Market Prices</div>
        <div className="card">🧠 AI Suggestions</div>
        <div className="card">🌱 Crop Health</div>
      </div>
    </div>
  );
}

/* Dashboard Page */
function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <Home />
    </div>
  );
}

export default Dashboard;