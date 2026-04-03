import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";

function AppRoutes() {
  return (
    <Routes>

      {/* ✅ Default route */}
      <Route path="/" element={<Dashboard />} />

      {/* Other routes */}
      <Route path="/chatbot" element={<div>AI Chatbot</div>} />
      <Route path="/weather" element={<div>Weather</div>} />
      <Route path="/market" element={<div>Market Prices</div>} />
      <Route path="/tasks" element={<div>Farm Tasks</div>} />
      <Route path="/disease" element={<div>Crop Disease</div>} />
      <Route path="/community" element={<div>Community</div>} />
      <Route path="/analytics" element={<div>Analytics</div>} />
      <Route path="/voice" element={<div>Voice Assistant</div>} />

    </Routes>
  );
}
export default AppRoutes;