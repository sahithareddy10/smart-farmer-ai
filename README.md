# 🌾 Smart Farmer AI System

An AI-powered agriculture platform designed to help farmers make smarter decisions through weather forecasting, crop recommendations, disease detection, market intelligence, voice assistance, and community collaboration.

## 🚀 Features

### 🌦️ Weather Dashboard

* Real-time weather updates
* 5-day weather forecast
* Temperature, humidity, and wind speed monitoring
* Farming tips based on weather conditions

### 🤖 AI Chat Assistant

* AI-powered farming guidance
* Crop cultivation recommendations
* Pest and disease management support
* Soil health and fertilizer suggestions

### 🎤 Multilingual Voice Assistant

* Voice-based interaction
* Supports English, Telugu, and Hindi
* Hands-free farming assistance

### 🔬 Crop Disease Detection

* Upload crop images
* AI-based disease analysis
* Disease prevention and treatment suggestions

### 🌱 Crop Recommendation System

* Recommendations based on:

  * Season
  * Soil Type
  * State/Region
* Helps farmers select suitable crops

### 📈 Market Price Dashboard

* Live mandi prices
* Crop price trends
* Rising and falling crop analysis
* MSP (Minimum Support Price) information

### ✅ Smart Task Tracker

* Create farming tasks
* Track task progress
* Monitor completed and pending activities

### 👨‍🌾 Farmer Community

* Share farming experiences
* Upload crop images
* Discuss best practices
* Interact with other farmers

### 📊 Farm Analytics

* Activity statistics
* Task completion reports
* AI query analytics
* Crop performance insights

---

# 🏗️ Project Architecture

smart-farmer-ai/

├── backend/ (Spring Boot)

│ ├── controller/

│ │ ├── AuthController

│ │ ├── AIController

│ │ ├── CropController

│ │ ├── MarketController

│ │ ├── TaskController

│ │ └── CommunityController

│ ├── entity/

│ │ ├── Farmer

│ │ ├── Task

│ │ └── Post

│ ├── repository/

│ ├── service/

│ ├── config/

│ └── pom.xml

│

├── frontend/ (React.js)

│ ├── api/

│ ├── components/

│ │ ├── WeatherDashboard

│ │ ├── AIChat

│ │ ├── VoiceAssistant

│ │ ├── CropDisease

│ │ ├── CropRecommendation

│ │ ├── MarketPrices

│ │ ├── TaskTracker

│ │ ├── CommunityFeed

│ │ └── FarmAnalytics

│ ├── pages/

│ ├── App.js

│ └── package.json

│

└── README.md

---

# 🛠️ Technology Stack

| Layer           | Technology                    |
| --------------- | ----------------------------- |
| Frontend        | React.js, React Router, Axios |
| Backend         | Spring Boot, Spring Security  |
| Database        | MySQL / H2 Database           |
| Authentication  | JWT                           |
| AI Integration  | OpenAI API                    |
| Weather Data    | OpenWeatherMap API            |
| Voice Assistant | Web Speech API                |
| Version Control | Git & GitHub                  |

---

# 🚀 Getting Started

## Backend

Requirements:

* Java 17+
* Maven 3.8+

```bash
cd backend
mvn spring-boot:run
```

Backend URL:

http://localhost:8082

## Frontend

Requirements:

* Node.js 16+
* npm

```bash
cd frontend
npm install
npm start
```

Frontend URL:

http://localhost:3000

---

# 🔑 Optional API Keys

application.properties

```properties
openai.api.key=YOUR_OPENAI_API_KEY
weather.api.key=YOUR_OPENWEATHERMAP_API_KEY
```

---

# 📡 API Endpoints

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| POST   | /api/auth/register  | Farmer Registration      |
| POST   | /api/auth/login     | Farmer Login             |
| POST   | /api/ai/chat        | AI Assistant             |
| GET    | /api/crop/recommend | Crop Recommendation      |
| GET    | /api/crop/diseases  | Crop Disease Information |
| GET    | /api/market/prices  | Market Prices            |
| POST   | /api/tasks          | Create Task              |
| GET    | /api/tasks          | Get Tasks                |
| POST   | /api/community      | Create Community Post    |
| GET    | /api/community      | View Community Posts     |

---

# 📷 Project Modules

✅ Weather Dashboard

✅ AI Chat Assistant

✅ Multilingual Voice Assistant

✅ Crop Disease Detection

✅ Crop Recommendation System

✅ Market Price Dashboard

✅ Smart Task Tracker

✅ Farmer Community Forum

✅ Farm Analytics Dashboard

---

# 👩‍💻 Author

Sahitha Reddy

GitHub:
https://github.com/sahithareddy10/smart-farmer-ai
