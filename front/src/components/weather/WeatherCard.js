import { useEffect, useState } from "react";
import API from "../../api/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const res = await API.get(`/weather?lat=${lat}&lon=${lon}`);
          setWeather(res.data);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch weather");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied");
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="card">
      <h2>🌤 Weather</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <>
          <p>🌡 Temperature: {weather.temperature} °C</p>
          <p>☁ Condition: {weather.condition}</p>
          <p>💧 Humidity: {weather.humidity}%</p>
        </>
      )}
    </div>
  );
}

export default WeatherCard;