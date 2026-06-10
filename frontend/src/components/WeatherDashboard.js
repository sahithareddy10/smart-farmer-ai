
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherDashboard.css";

const API_KEY = "fe013f1010e756ab0247c777333e9728";

function WeatherDashboard() {
  const [city, setCity] = useState("Hyderabad");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const getWeather = async () => {
    try {
      const current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeather(current.data);

      const dailyForecast = forecastRes.data.list.filter(
        (_, index) => index % 8 === 0
      );

      setForecast(dailyForecast.slice(0, 5));
    } catch (error) {
      console.error(error);
      alert("City not found");
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="weather-dashboard">

      <h1>🌾 Smart Farmer Weather Dashboard</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={getWeather}>
          Search
        </button>
      </div>

      {weather && (
        <>
          <div className="current-weather">

            <div>
              <h2>📍 {weather.name}</h2>

              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>

              <p>{weather.weather[0].description}</p>

              <p>
                Feels Like {Math.round(weather.main.feels_like)}°C
              </p>
            </div>

            <div className="weather-stats">

              <div className="stat-card">
                <h4>💧 Humidity</h4>
                <h2>{weather.main.humidity}%</h2>
              </div>

              <div className="stat-card">
                <h4>🌬 Wind</h4>
                <h2>{weather.wind.speed} km/h</h2>
              </div>

            </div>

          </div>

          <h2 className="section-title">
            📅 5 Day Forecast
          </h2>

          <div className="forecast-grid">

            {forecast.map((day, index) => (
              <div className="forecast-card" key={index}>

                <h3>
                  {new Date(day.dt_txt).toLocaleDateString()}
                </h3>

                <div className="forecast-temp">
                  {Math.round(day.main.temp)}°C
                </div>

                <p>{day.weather[0].main}</p>

                <p>💧 {day.main.humidity}%</p>

              </div>
            ))}

          </div>

          <div className="dashboard-grid">

            <div className="info-card">
              <h3>🌾 Farming Tips</h3>

              <ul>
                <li>Monitor soil moisture regularly.</li>
                <li>Delay fertilizer before rain.</li>
                <li>Check crops for fungal diseases.</li>
                <li>Good irrigation conditions.</li>
              </ul>
            </div>

            <div className="info-card">
              <h3>🚨 Weather Alerts</h3>

              <ul>
                <li>Heavy rainfall may affect spraying.</li>
                <li>High humidity increases disease risk.</li>
                <li>Strong winds may affect crops.</li>
              </ul>
            </div>

            <div className="info-card">
              <h3>🌱 Crop Advisory</h3>

              <p>Rice → Good Conditions</p>
              <p>Cotton → Monitor Moisture</p>
              <p>Maize → Suitable Temperature</p>
            </div>

            <div className="info-card">
              <h3>💧 Irrigation Advice</h3>

              <p>
                {weather.main.humidity > 70
                  ? "Irrigation Not Required"
                  : "Irrigation Recommended"}
              </p>
            </div>

            <div className="info-card">
              <h3>🧪 Spray Recommendation</h3>

              <p>
                Avoid spraying pesticides if rain is forecast.
              </p>
            </div>

            <div className="info-card">
              <h3>📊 Smart Farmer Summary</h3>

              <p>Temperature: {weather.main.temp}°C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} km/h</p>
              <p>Condition: {weather.weather[0].main}</p>
            </div>

          </div>
        </>
      )}

    </div>
  );
}

export default WeatherDashboard;