# 🌾 Smart Farmer AI System

A full-stack AI-powered farming assistant platform built with React.js + Spring Boot + H2 Database.

---

## 📁 Project Structure

```
smart-farmer-ai/
├── backend/          ← Spring Boot (Java)
│   ├── pom.xml
│   └── src/main/java/com/smartfarmer/backend/
│       ├── controller/   (AuthController, AIController, CropController, MarketController, TaskController, CommunityController)
│       ├── entity/       (Farmer, Task, Post)
│       ├── repository/   (FarmerRepository, TaskRepository, PostRepository)
│       ├── service/      (FarmerService)
│       └── config/       (SecurityConfig, CorsConfig, JwtUtil)
├── frontend/         ← React.js
│   ├── package.json
│   └── src/
│       ├── api/          (axios API client)
│       ├── components/   (WeatherDashboard, AIChat, VoiceAssistant, CropDisease, CropRecommendation, TaskTracker, CommunityFeed, MarketPrices, FarmAnalytics)
│       ├── pages/        (Login, Register, Dashboard)
│       ├── App.js
│       └── App.css
└── README.md
```

---

## 🚀 How to Run

### Backend (Spring Boot)

**Requirements:** Java 17+, Maven 3.8+

```bash
cd backend
mvn spring-boot:run
```

Backend starts at: http://localhost:8082
H2 Console: http://localhost:8082/h2-console
(JDBC URL: jdbc:h2:mem:smartfarmerdb, User: sa, Password: blank)

### Frontend (React)

**Requirements:** Node.js 16+, npm

```bash
cd frontend
npm install
npm start
```

Frontend starts at: http://localhost:3000

---

## 🔑 API Keys (Optional)

Edit `backend/src/main/resources/application.properties`:

```properties
# For real AI responses (optional - demo mode works without it)
openai.api.key=YOUR_OPENAI_API_KEY_HERE

# For real weather data (optional - demo mode works without it)
weather.api.key=YOUR_OPENWEATHERMAP_API_KEY_HERE
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Farmer registration |
| POST | /api/auth/login | Farmer login |
| POST | /api/ai/chat | AI crop advisory |
| GET  | /api/crop/recommend | Crop recommendations |
| GET  | /api/crop/diseases?crop=rice | Disease info |
| GET  | /api/market/prices | Market prices |
| GET  | /api/market/msp | Minimum support prices |
| POST | /api/tasks | Create farm task |
| GET  | /api/tasks | Get all tasks |
| PUT  | /api/tasks/{id}/status | Update task status |
| POST | /api/community | Create community post |
| GET  | /api/community | Get all posts |
| POST | /api/community/{id}/like | Like a post |

---

## 👨‍🌾 Features

- **Farmer-only authentication** (JWT-based)
- **AI Chat Assistant** (GPT integration + smart fallback)
- **Voice Assistant** (Web Speech API)
- **Crop Disease Detection** (image upload + AI analysis)
- **Crop Recommendations** (season/soil/state filters)
- **Market Prices** (live data + MSP)
- **Task Tracker** (Pending → In Progress → Completed)
- **Community Feed** (post, like, share)
- **Farm Analytics** (charts and statistics)
- **Weather Dashboard** (5-day forecast + farming tips)
- **Multi-language support** (English, Telugu, Hindi)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, React Router, Axios |
| Backend | Spring Boot 3.2, Spring Security |
| Auth | JWT (JSON Web Tokens) |
| Database | H2 In-Memory Database |
| AI | OpenAI GPT-3.5 (with smart demo fallback) |
| Weather | OpenWeatherMap API |

